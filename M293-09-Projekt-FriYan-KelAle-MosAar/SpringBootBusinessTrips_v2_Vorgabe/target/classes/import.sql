INSERT INTO business_trip (id, title, description, start_trip, end_trip) VALUES
  (1, 'BT01', 'San Francisco World Trade Center on new Server/IOT/Client', '2021-02-13T00:00:00', '2021-02-15T16:56:00'),
  (2, 'BT02', 'Santa Clara Halley on new Server/IOT/Client', '2021-06-23T09:00:00', '2021-06-27T16:56:00'),
  (3, 'BT03', 'San Cose City Halley on Docker/IOT/Client', '2021-12-13T09:00:00', '2021-12-15T16:56:00');

INSERT INTO meeting (id, title, description, business_trip_idfs) VALUES
  (1, 'One Conference', 'Key Note on One Conference', 1),
  (2, 'Zero Conference', 'Workshop Zero on One Conference', 1),
  (3, 'One Conference', 'HandsOn on One Conference', 2),
  (4, 'One Conference', 'Key Note on One Conference', 2),
  (5, 'One Conference', 'Key Note on One Conference', 3);
