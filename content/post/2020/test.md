---
categories:
  - World of Warcraft
title: Test
author: ellen
date: 2020-06-01T01:00:54.000Z
draft: "true"
---
Testing, testing. Now I just want to see if hotkeys work the way I would hope.

Seems that no, they do not. That is rather unfortunate, because it means using this for editing would be very frustrating. Well, not just editing, but authoring as well, which unfortunately does lead me to the conclusion that switching might not be a good idea despite all the potential (speed, security) benefits it might bring. I mean, writing is as nice as it is in Wordpress, enter creates a new paragraph as is to be expected. Quotes:

> Well, they work like basic Markdown quotes so I'd have to figure out something for the citation part of it.

Also, wow, I'm making so many more typos than usual now, what is going on?

## Heading, easy peasy

It is a bit silly that I need to choose what type of heading I want though, but no real biggie. Just defaulting to h2 would be nice, but I guess they need to accomodate other backends and static site generators as well, along with other templates so makes sense.

It is missing the word/paragraph count, but that's not *overly* necessary I find. Oh, [how do links work?](https://example.com) Ok, pretty much as espected, the UI for them is a bit boring though and of course no search for internal linking is a bit of a bummer. Hmm, not that I'm likely to need them considering the type of content I've written so far, but how do code blocks look? I'm curious because someone mentioned having trouble with them on the community site.

```lua
local welp = "Kind of what I expected"
print(welp)
```

I think the real question is how they get formatted on the Markdown side and then parsed by Hugo in my case. Oh, that was something I was considering, using something else than Hugo. Also, I wonder if there is a way to automatically populate the Author field? Seems a bit unecessary to work on the honor system, even if I am the only person using this system. Though to be fair, it does make guest posts easier... I guess that's something that is easily enough customisable? Also, to be even more fair, the likelihood of there actually being guest posts on here is vanishingly small, so account for that is probably very unecessary at this point in time. Would even make the most sense to completely hide the author field and just prepopulate it as a hidden field so that I don't have to do that at some later point.

But yes, my biggest annoyance at this point is just Mac+S not working for saving, Ctrl+S doesn't work either but not really expecting it to on a Mac. I guess I could try Ctrl+S on Windows buuut I'm doing most of my writing here so it doesn't matter as much if it works there and not here.

That's actually a good point: how are images handled? OK, upload button is broken, does nothing? That's more than a tad annoying. Oh, maybe I haven't configured that? media_folder was configured, strange. Wait, maybe the folder needs to actually exist first? If that's the case, oh man...

Well, that was annoying. So, upload seems to work in Edge but not Firefox. Also, logging in in Edge logged me out in Firefox which meant that I needed to copy over my changes in order to be able to save them. I mean, at the moment I mostly write in Edge anyway so only being able to upload images here is not really a biggie but it is still really strange and does count against this as my primary CMS. It could potentially be MacOS playing games though, with the permission system added in later versions, not sure.

Anyway, images:

![alt](/images/uploads/brille.png "I wonder where this gets uploaded now?")

Ok, that was strange, for some reason the image I uploaded earlier isn't showing up here in the media library now?

Wait what. Why did the image get uploaded to the content directory and no the static directory? This is all kinds of incorrect. Ok, I guess that comes from me using the collections.path configuration option, seems to not only change where the content file gets stored but also how other content gets linked to *sigh*. Solution found (I think), now we wait for the redeploy and then press publish again, which will hopefully fix this situation. Might have to include a new image, we'll see.