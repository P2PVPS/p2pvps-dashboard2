const server = "p2pvps.net";

$(document).ready(function() {
  getDeviceData();
});

async function getDeviceData() {
  var devicePublicModels;
  var obContractModels;
  debugger;

  try {
    // get the devicePublicModels for all the devices on the server.
    const devices = await getDevices();

    const contracts = await getObContractData();

    return generateGrid(devices, contracts);
  } catch (err) {
    debugger;
    console.error(`Error in p2pvps.js: `, err);
  }
}

// Retrieve all devicePublicModels from the server.
function getDevices() {
  return new Promise(function(resolve, reject) {
    return $.get(`https://${server}/api/devices`, "", function(data) {
      var collection = data.devices;

      return resolve(collection);
    }).fail(function(jqXHR, textStatus, errorThrown) {
      return reject(jqXHR);
    });
  });
}

// Retrieve all obContract models from the server.
function getObContractData() {
  return new Promise(function(resolve, reject) {
    return $.get(`https://${server}/api/obcontract`, "", function(data) {
      var collection = data.obContracts;

      resolve(collection);
    });
  });
}

// Open the modal
function openModal(type, arg) {
  var modal = $("#myModal");

  // Show a listing
  if (type === 1) {
    var storeUrl = "ob://QmPUf97TtPT1JapY6ey1tc9tiErcUpZPoTQTx5KVD2rQ5r/store";
    var slug = "";

    var bodyMsg = `
<p>Click the button below and your browser open the listing in your OpenBazaar client.</p>
<center><a type="button" class="btn btn-primary" href="${storeUrl +
      arg}">Open OpenBazaar</a></center>
<br><br>
<p></p>
<p>If the button does not take you to the listing, paste the below URL in your OpenBazaar client:</p>
<center><p>${storeUrl + arg}</p></center>
    `;

    modal.find(".modal-title").text("View Listing");

    modal.find(".modal-body").empty();
    modal.find(".modal-body").append(bodyMsg);

    modal.modal("show");
  } else {
    // Show the description associated with the selected listing.
    modal.find(".modal-title").text("Listing Description");

    modal.find(".modal-body").empty();

    getDescription(arg).then(desc => {
      modal.find(".modal-body").append(`<p>${desc}</p>`);

      modal.modal("show");
    });
  }
}

// Retrieve the description for the selected listing.
function getDescription(id) {
  return getDeviceData().then(deviceModels => {
    // debugger;

    var thisDeviceModel = deviceModels.find(model => model._id === id);

    return thisDeviceModel.deviceDesc;
  });
}
