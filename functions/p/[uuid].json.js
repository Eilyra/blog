export async function onRequestGet({ env, params }) {
    if (!params.uuid.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        return new Response("Not found", {
            status: 404
        });
    }
    const jwt = require('jose');
    const [id, secret] = env.GHOST_ADMIN_API_KEY.split(':');
    const token = await new jwt.SignJWT({})
        .setProtectedHeader({kid: id, alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('5m')
        .setAudience('/admin')
        .sign(Uint8Array.from(secret.match(/.{1,2}/g).map(byte => parseInt(byte, 16))));
    return await fetch(env.GHOST_API_URL + '/ghost/api/admin/posts?' + `filter=uuid:${params.uuid}`, {
        headers: {
            Authorization: `Ghost ${token}`
        }
    });
}