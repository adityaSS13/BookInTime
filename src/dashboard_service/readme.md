# Dashboard service

This microservice hosts various API endpoints for the UI

```javascript
  app.use("/cities",citiesrouter);
  app.use("/movies",moviesrouter);
  app.use("/theaters",theatersrouter);
  app.use("/bookings",bookingsrouter);
  app.use("/gettheaterinfo",theateradminrouter);
```