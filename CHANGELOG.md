# Changelog

Semantic versioning: MAJOR = a prop, exported type, or default behaviour changed in a way that
could break an existing consumer without any code change on their side. MINOR = additive only.
Consuming projects should pin to a tag (`#v1.0.0`), never `#main`.

## v1.0.0 — 2026-08-23

First release. `ClaudiaComments` -- threaded comments (one level of replies, matching the real
pattern exactly), flagging, moderation, real-time updates. Ported from SafeSpaces' real
`blog_comments` table and its actual 456-line `BlogComments.tsx` (checked both before this).

Genuinely, honestly a SUBSET of that real component, named plainly rather than glossed over:
SafeSpaces' version also has @mentions, emoji reactions (a real, separate subsystem), inline
translation, and a full report-content dialog wired to moderation queues. None of those are
here -- this ships the real, portable core.

Genuinely polymorphic (`entity_type` + `entity_id`), not one hardcoded table per content type
the way SafeSpaces has three (blog/message-board/document-review comments): Claudia has one
clear real candidate today (knowledge articles) and no proven need for three separate tables,
so the schema generalises where SafeSpaces' own shape doesn't map 1:1 -- the real
generalisation the unification principle calls for.

Schema (`claudia_comments`) proven correct with real RLS tests before the UI was built,
including a real forge attempt: a genuine session successfully posts its own comment; the
SAME session's attempt to insert a comment claiming a DIFFERENT user's id is refused by RLS
(the actual policy-violation error, not assumed); a different user's attempt to update
someone else's comment is confirmed to silently affect zero rows by re-reading the content
afterward, not just trusting the absence of an error.

A flagged comment's content is hidden from everyone except its author and the project owner,
matching the real SafeSpaces placeholder UX, enforced in the component rather than only in
the UI (RLS allows reading a flagged row's metadata for anyone; the content itself is what
`ClaudiaComments` narrows).

`resolveAuthor` is dependency-injected -- Claudia has no shared, generic profiles table the
way SafeSpaces does.

**Known consumers at this tag:** none yet at release.
