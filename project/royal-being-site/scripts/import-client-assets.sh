#!/usr/bin/env bash
# Royal Being — client asset importer (bash 3.2 compatible)
# Converts HEIC->JPEG (web) via sips, copies real client photos/schematics/videos
# into organized public/assets/client/* folders. Re-runnable.
set -eo pipefail

SRC="${1:-/private/tmp/claude-501/-Users-bstar-F-Projects/86ae7a07-8d08-40f6-be5c-dc7a84107a1b/scratchpad/rb-assets}"
DL="${HOME}/Downloads"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/assets/client"
MAXW=1600
Q=80

conv() { # src  dest(without ext)
  local s="$1" d="$2"
  [ -f "$s" ] || { echo "  MISSING: $s"; return 0; }
  mkdir -p "$(dirname "$d")"
  case "${s##*.}" in
    png|PNG) sips -s format png -Z 1800 "$s" --out "$d.png" >/dev/null 2>&1 ;;
    *)       sips -s format jpeg -s formatOptions $Q -Z $MAXW "$s" --out "$d.jpg" >/dev/null 2>&1 ;;
  esac
}

# each line: "SUBDIR/z13|filename|dest-relative-to-OUT"
map() {
cat <<'EOF'
z13|Bamboozled.HEIC|products/bamboozled/bamboozled-1
z13|Bamboozled 3.HEIC|products/bamboozled/bamboozled-2
z13|Bamboozled.jpeg|products/bamboozled/bamboozled-3
z13|Bamboozled 001.jpeg|products/bamboozled/bamboozled-4
z13|Teakwood.HEIC|products/teakwood/teakwood-1
z13|Teakwood 0.HEIC|products/teakwood/teakwood-2
z13|Teakwood 1.HEIC|products/teakwood/teakwood-3
z14|Woody.HEIC|products/woody/woody-1
z14|Woody 0.HEIC|products/woody/woody-2
z14|Woody 1.HEIC|products/woody/woody-3
z14|Woody 2.HEIC|products/woody/woody-4
z14|The Ethan.HEIC|products/the-ethan/the-ethan-1
z14|The Ethan 0.HEIC|products/the-ethan/the-ethan-2
z14|The Ethan 2.HEIC|products/the-ethan/the-ethan-3
z14|The Ethan 3.HEIC|products/the-ethan/the-ethan-4
z14|The Aristocrat.heic|products/the-aristocrat/the-aristocrat-1
z14|The Aristocrat copy.heic|products/the-aristocrat/the-aristocrat-2
z14|The Aristocrat.1 copy.heic|products/the-aristocrat/the-aristocrat-3
z13|The Royal Duke Collection.jpeg|collections/royal-duke/royal-duke-1
z13|The Royal Duke Collection 00.jpeg|collections/royal-duke/royal-duke-2
z13|The Royal Duke Collection 2.jpeg|collections/royal-duke/royal-duke-3
z13|The Royal Duke Collection.HEIC|collections/royal-duke/royal-duke-4
z13|The Royal Duke Collection Extra.HEIC|collections/royal-duke/royal-duke-5
z13|The Royal Collection 4.HEIC|collections/royal/royal-1
z13|IMG_0318.HEIC|editorial/misc-0318
z15|2.png|products/turmeric-swirl/turmeric-swirl-1
z15|3.png|products/citrus-heaven/citrus-heaven-1
z15|4.png|products/aloe-vera-wave/aloe-vera-wave-1
z15|5.png|products/detoxify/detoxify-1
z15|6.png|products/charcoal-moment/charcoal-moment-1
z15|7.png|products/aquatic-escape/aquatic-escape-1
z15|8.png|editorial/private-reserve
z15|9.png|products/blissful-lavender/blissful-lavender-1
z15|10.png|products/glow-rify/glow-rify-1
z15|11.png|collections/royal-kid/royal-kid-1
z15|12.png|products/gilded-age/gilded-age-1
z15|13.png|products/calm/calm-1
z15|14.png|products/beef-tallow/beef-tallow-1
z15|15.png|products/fresh-floral-fiesta/fresh-floral-fiesta-1
z16|Purify _ Detox (African Rhapsody_ Charcoal Moment_ Detoxify).jpeg|editorial/purify-detox
z16|Calm _ Soothe (Blissful Lavender_ Calm_ Aquatic Escape).jpeg|editorial/calm-soothe
z16|Gilded Luxury (Gilded Age_ The Aristocrat_ Beef Tallow).jpeg|editorial/gilded-luxury
z16|Four bar soaps stacked.jpeg|editorial/stacked-bars-1
z16|Four bar soaps stacked 1.jpeg|editorial/stacked-bars-2
z16|Hand holding soap in shower.jpeg|editorial/hand-in-shower
z17|Man.jpeg|lifestyle/man-1
z17|Man 1.jpeg|lifestyle/man-2
z17|Man 2.jpeg|lifestyle/man-3
z17|Man 3.jpeg|lifestyle/man-4
z17|Child holding herbal soap.jpeg|lifestyle/child-1
z17|Child holding herbal soap 1.jpeg|lifestyle/child-2
z17|Child holding herbal soap 2.jpeg|lifestyle/child-3
z17|Child holding herbal soap 3.jpeg|lifestyle/child-4
z17|woman.jpeg|lifestyle/woman-1
z17|woman 1.jpeg|lifestyle/woman-2
z17|woman 2.jpeg|lifestyle/woman-3
z17|woman 3.jpeg|lifestyle/woman-4
EOF
}

n=0
map | while IFS='|' read -r sub file dest; do
  [ -z "$sub" ] && continue
  conv "$SRC/$sub/$file" "$OUT/$dest"
done

echo "== Royal Duke collection PDF =="
cp "$SRC/z13/The Royal Duke Collection.pdf" "$OUT/collections/royal-duke/royal-duke-collection.pdf" 2>/dev/null || true

echo "== Videos =="
cp "$DL/FINAL CUT- ROYAL BEING AD horizontal version.mp4" "$OUT/videos/royal-being-ad-horizontal.mp4" 2>/dev/null || true
cp "$DL/FINAL CUT - WATERMELON FUSION LONG.mp4" "$OUT/videos/watermelon-fusion.mp4" 2>/dev/null || true

echo "== Brand reference logo =="
cp "$DL/LOGO-1 copy (1).png" "$OUT/brand/client-logo-reference.png" 2>/dev/null || true

echo "== DONE =="
find "$OUT" -type f | wc -l | xargs echo "total client asset files:"
