exports.getAbout = (req, res) => {
  res.json({
    client: {
      host: req.ip,
    },
    server: {
      current_time: Date.now(),
      services: [
        {
          name: " weather ",
          widgets: [
            {
              name: " city_temperature ",
              description: " Display temperature for a city ",
              params: [
                {
                  name: " city ",
                  type: " string ",
                },
              ],
            },
          ],
        },
        {
          name: " nasa ",
          widgets: [
            {
              name: " nasa_widget ",
              description: " Displays pictures of a selected planet ",
              params: [
                {
                  name: " planet ",
                  type: " string ",
                },
              ],
            },
          ],
        },
        {
          name: " airQuality ",
          widgets: [
            {
              name: " airquality_widget ",
              description:
                " Displays informations about the air quality on a  given city name  ",
              params: [
                {
                  name: " city ",
                  type: " string ",
                },
              ],
            },
          ],
        },
        {
          name: " covid infos france ",
          widgets: [
            {
              name: " covidInfoFranceWidget ",
              description:
                " Displays informations about Covid-19 on a given city ",
              params: [
                {
                  name: " city ",
                  type: " string ",
                },
              ],
            },
          ],
        },
        {
          name: " covid infos world ",
          widgets: [
            {
              name: " covidInfoWorldWidget ",
              description:
                " Displays informations about Covid-19 on a given country ",
              params: [
                {
                  name: " city ",
                  type: " string ",
                },
              ],
            },
          ],
        },
      ],
    },
  });
};
