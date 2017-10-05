graceshopper


Directory Structure


root folder




      webpack.config.js
      package.json
      README.md
      seed.js
      .gitignore
      server.js
      app.js
      Procfile
      
      assets--
              |
              images--------
                            |
                            image_1.jpeg
      db-----
              | 
              db.js
              Model_1.js
              Model_2.js
              index.js
      dist----
              | 
              bundle.js
              bundle.js.map
      public--
              |
              favicon.ico
              index.html
              |
              css-----
                      | 
                      main.css
                      custom.css (auto built by script file)
                      |
                      scss----------
                                    |
                                    custom.scss
      routes--
              |
              api.js  (aggregates other routes...)
              route_1.js
              route_2.js
      src---
            |
            index.js
            | 
            actions-------
                          |
                          index.js
            components----
                          |
                          Component_1.js
                          Component_2.js
            containers----
                          |
                          Container_1.js
                          Container_2.js
            reducers------
                          |
                          index.js  (combined reducer)
                          reducer_1.js
                          reducer_2.js
            store---------
                          |
                          index.js
