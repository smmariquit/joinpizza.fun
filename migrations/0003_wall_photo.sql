-- Optional photo on a yap wall post: its R2 key (wall/<uuid>.<ext>) in the WALL_PHOTOS bucket.
-- Hiding a row takes it off the wall, but the photo URL still works. To remove the photo too:
-- npx wrangler r2 object delete joinpizza-wall/<key> --remote
ALTER TABLE wall ADD COLUMN photo TEXT;
