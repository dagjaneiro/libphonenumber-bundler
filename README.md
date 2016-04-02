# libphonenumber-bundler

A CLI utility that compiles and bundles google's [libphonenumber](https://github.com/googlei18n/libphonenumber) in a standalone javascript file.

## Examples

### Listing available versions for bundling

```
$ lpn-bundler list
fetching tags...done

Versions available for bundling:

  - libphonenumber-7.2.8
  - libphonenumber-7.2.7
  - libphonenumber-7.2.6
  - libphonenumber-7.2.5
  - libphonenumber-7.2.4
  - libphonenumber-7.2.3
  - libphonenumber-7.2.2
  - libphonenumber-7.2.1
  - libphonenumber-7.2.0
  - libphonenumber-7.1.1
  - libphonenumber-7.1.0
  - libphonenumber-7.0.12
  - libphonenumber-7.0.11
  - libphonenumber-7.0.10
  - libphonenumber-7.0.9
  - libphonenumber-7.0.8
  - libphonenumber-7.0.7
  - libphonenumber-7.0.6
  - libphonenumber-7.0.5
  - libphonenumber-7.0.4
  - libphonenumber-7.0.3
  - libphonenumber-7.0.2
```

### Bundling a specific version

```
$ lpn-bundler bundle -t 7.2.7 -o libphonenumber.js
fetching tags...done
matched: [libphonenumber-7.2.7]
compiling code...done
saving file...done
file saved to /Users/daj/libphonenumber.js
