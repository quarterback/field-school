# East Detroit concept scenes

Python scripts that render the images used on the My East Detroit public pages and service pages. East Detroit is fictional, so the homepage uses rendered scenes of the city in 2030 in place of photographs.

| Script | Image | Place |
| --- | --- | --- |
| `civic.py` | `civic-square-2030.jpg` | Civic Square at sunset, looking west to the Front Range |
| `station.py` | `central-station-2030.jpg` | Light rail platform at Central Station at dusk |
| `greenway.py` | `box-elder-greenway-2030.jpg` | Box Elder Creek greenway trail with new homes behind |
| `library.py` | `watkins-library-2030.jpg` | Watkins Public Library entrance, with a resident tapping a card at the door reader |

Requires Python 3 with numpy, scipy and Pillow. Run from this folder and pass the output path:

```
python3 civic.py ../portable/public/assets/civic-square-2030.jpg
```

The homepage copies were resized and recompressed for the web after rendering. To replace a scene with a real photograph, keep the file name or update the `src` in `portable/src/PublicEntry.tsx`.
