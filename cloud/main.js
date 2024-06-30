Parse.Cloud.define('getSmileCenters', async (request) => {
  const { centerType, zone, services } = request.params;

  const query = new Parse.Query('SmileCenters');

  if (centerType) {
    query.equalTo('Center_Type', centerType);
  }
  if (zone) {
    query.equalTo('Zone', zone);
  }
  if (services) {
    query.contains('Services', services);
  }

  try {
    const results = await query.find();
    return results.map((center) => {
      const servicesData = center.get('Services');
      return {
        name: center.get('Center_Name'),
        address: center.get('Street'),
        calendarId: center.get('Calendar_Id'),
        appointmentTypeId: services ? servicesData[services] : center.get('Appointment_Type_Id'),
      };
    });
  } catch (error) {
    throw new Error('Error fetching Smile Centers: ' + error.message);
  }
});
