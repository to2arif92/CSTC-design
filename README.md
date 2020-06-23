### Install all project Dependencies 

```
npm install
```

### Run and build with Gulp default

```
gulp
```

### Run Gulp and watch for development

```
gulp watch
```

### To run specific Gulp Task

```
gulp <taskName>
```



## Branch Note 

dark-theme_v1 branch is actually light-theme_v1 (pre matured phase)



> ### **Note:** 
>
> Due to deprecation of **Gulp v3.x.x** and its incompatibility with **NodeJS 12+**, follow the [below steps](https://stackoverflow.com/questions/55921442/how-to-fix-referenceerror-primordials-is-not-defined-in-node) to get it working without downgrading NodeJS: 
>
> - Create a file `npm-shrinkwrap.json` in project root path
>
>   ```json
>   {
>     "dependencies": {
>   	"graceful-fs": {
>   		"version": "4.2.2"
>   	 }
>     }
>   }
>   ```
>
> - Run `npm install`, and don't worry, it'll update `npm-shrinkwrap.json` with a bunch of content
>
> - Run `gulp` to start the project
>
> 
>
> #### To get rid of Gulp not working after running `npm install` again:
>
> - Modify `package.json` as below,
>
>   ```json
>   {
>     "scripts": {
>       "preinstall": "npx npm-force-resolutions"
>     },
>     "resolutions": {
>       "graceful-fs": "4.2.3"
>     }
>   }
>   ```
>
> - Repeat the steps above







[![Analytics](https://ga-beacon.appspot.com/UA-129757738-3/CSTC-design/readme)](https://github.com/igrigorik/ga-beacon)