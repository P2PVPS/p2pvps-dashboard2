
$(document).ready(function () {
  var devicePublicModels;
  var obContractModels;

  // get the devicePublicModels for each listed device.
  getDeviceData()

  .then(data => {
    devicePublicModels = data;

    // console.log(`devicePublicModels = ${JSON.stringify(data,null,2)}`);

    return getObContractData();
  })

  // get the obContract model for each listed device.
  .then(data => {
    obContractModels = data;

    console.log(`obContractModels = ${JSON.stringify(data, null, 2)}`);

    return generateGrid(devicePublicModels, obContractModels);
  })
});

// Retrieve all devicePublicModels from the server.
function getDeviceData () {
  return new Promise(function (resolve, reject) {
    return $.get('/api/devicePublicData/list', '', function (data) {
      // debugger;

      var collection = data.collection;

      resolve(collection);
    });
  });
}

// Retrieve all obContract models from the server.
function getObContractData () {
  return new Promise(function (resolve, reject) {
    return $.get('/api/obContract/list', '', function (data) {
      // debugger;

      var collection = data.collection;

      resolve(collection);
    });
  });
}

// Open the modal
function openModal (type, arg) {
  var modal = $('#myModal')

  // Show a listing
  if (type === 1) {
    var storeUrl = 'ob://QmYfMAnHQrHAKrWD6bENvD7Z4JCgvdxFJgKzt2kCpCTidw/store/';
    var slug = '';

    var bodyMsg = `
<p>Click the button below and your browser open the listing in your OpenBazaar client.</p>
<center><a type="button" class="btn btn-primary" href="${storeUrl + arg}">Open OpenBazaar</a></center>
<br><br>
<p></p>
<p>If the button does not take you to the listing, paste the below URL in your OpenBazaar client:</p>
<center><p>${storeUrl + arg}</p></center>
    `;

    modal.find('.modal-title').text('View Listing');

    modal.find('.modal-body').empty();
    modal.find('.modal-body').append(bodyMsg);

    modal.modal('show');
  }

  // Show the description associated with the selected listing.
  else {
    modal.find('.modal-title').text('Listing Description');

    modal.find('.modal-body').empty();

    getDescription(arg)

    .then(desc => {
      modal.find('.modal-body').append(`<p>${desc}</p>`);

      modal.modal('show');
    });
  }
}

// Retrieve the description for the selected listing.
function getDescription (id) {
  return getDeviceData()

  .then(deviceModels => {
    // debugger;

    var thisDeviceModel = deviceModels.find(model => model._id === id);

    return thisDeviceModel.deviceDesc;
  })
}
