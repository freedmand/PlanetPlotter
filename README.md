# PlanetPlotter

Run preprocessing:

```bash
python preprocessing/ctr_convert.py [path_to_ctr] public/planets/[name].bin
```

Then go to `src/pages/Home.svelte` and edit in the name of the planet in the `<Plot/>` component.


## Running the JavaScript

Run `npm install` to install the required packages.

Run `npm run dev` to launch a server at http://localhost:3000. This will auto-refresh as you change things.

To edit the drawing style, go to `src/common/Plot.svelte`.
