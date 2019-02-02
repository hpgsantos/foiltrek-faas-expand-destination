# foiltrek-faas-expand-destination
Generate expanded pair dates.

# Ideaah Faas Handle Survey

### Commands

```
lambda-local -l index.js -h handler -e input-events/inevt-flight-pair.js
zip -r foiltrek-faas-expand-destination.zip node_modules/ schema/ helper/ index.js
```

### POST content

```json
    {
        "type":"flight",
        "trek":[
            {
                "from":"BSB",
                "to":"CGH",
                "dates":["2019-01-08T00:00:00.000", "2019-01-10T00:00:00.000"],
                "ranges":[40],
                "round":true
             }
        ]
    }
```
