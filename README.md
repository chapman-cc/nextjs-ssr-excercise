# Welcome to SSR

## Setup

```bash
pnpm install
pnpm dev
```

in another terminal

```bash
pnpm run server
```

## Stack
- React@_19_
- NextJS@_15_
- tailwindcss@_4_
- shadcn ready 

## Server

I have prepared a server for you. I download _**Transport for London**_ accidents statistics (2019) as a json file.  
it houses 50626 entries for that single year.
You can query from that json with json-server@v0.17.4

1. open a terminal, run `pnpm run server`
1. query from `fetch("http://localhost:3030/accidents-stat")` for the full list
1. you can do pagination with query params by `/accidents-stat?_page=1&_limit=20` ([guide](https://github.com/typicode/json-server/tree/v0.17.4?tab=readme-ov-file#paginate))


## Objectives
1. you must use server side rendering on page.tsx or any inner components, **`"use client"` directive is prohibited**, with the following exceptions:
    - layout
    - error
    - not found
    - components where returned root is `<form>`
1. you must do pagination in _*SSR way*_
1. do not use *Tanstack Query* as it is for client side fetching 
1. The table is in `http://localhost:3000/`, individual accident details screen at `http://localhost:3000/<accident id>`
1. you need to handle 404 not found and error in _*SSR way*_
1. you can loosly resemble these screenshot


## Bonus stage
Here are challenges that utilise SSR
- add filtering on location or borough field, or sorting via query params
- use modal to display individual accident page
- use `<form>` `<input>` `<button type="submit">` to append query param for keyword filtering (allow to use `"use client";` for this single component, not whole page)
- explore caching in nextjs
