/*
  TODO:
  -Add persistObContractModel() to persist changes to the obContractModel to the server.
  -Add persistDevicePrivateModel() to persist changes to devicePrivateModel to the server.
*/

export default {
  // Present a modal to user to create an account.
  createAccount(context) {
    // Display a modal to the user
    var modal = {
      show: true,
      title: "Create Account",
      body: "Use the form below to create a new account.",
      button1Text: "",
      button1Func: null,
      button1Show: false,
      button2Text: "",
      button2Func: null,
      button2Show: false,
      showLoginForm: true
    };
    context.commit("UPDATE_MODAL", modal);
  },

  // Get the user ID (GUID). Will present a modal to the user if they are not logged in.
  getId(context) {
    context.commit("SET_USER_ID", "Not Logged In");

    const globalThis = this;

    // Display a modal to the user
    var modal = {
      show: true,
      title: "Please log in",
      body: "You are not logged in. Please log in below:",
      //button1Text: 'Close',
      //button1Func: function () { $('.appModal').modal('hide') },
      button1Text: "Create Account",
      button1Func: function() {
        globalThis.dispatch("createAccount");
      },
      button1Show: true,
      button2Text: "",
      button2Func: null,
      button2Show: false,
      showLoginForm: true
    };
    context.commit("UPDATE_MODAL", modal);
  },

  // getDeviceData retrieves device data from the server and populates the Vuex store
  // with the data.
  async getDeviceData(context) {
    let ownedDevices = [];

    // Get the devices owned by the current user.
    ownedDevices = await getDevicesById(context);

    context.commit("SET_OWNED_DEVICES", ownedDevices);
  },

  // This function deletes a devicePublicModel and devicePrivate model from the server.
  // TODO Add the ability to delete obContractModel associated with devicePublicModel.
  deleteDevice(context, deviceId) {
    const token = context.state.userInfo.token;

    // Delete the public data model
    $.ajax({
      url: `/api/devices/${deviceId}`,
      type: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      },
      success: function(data) {
        // Error handling
        if (!data.success) {
          console.error("Unable to delete device with ID " + deviceId);
          return;
        }

        // Refresh the Store.
        if (context.state.userInfo.GUID !== "Not Logged In") {
          context.dispatch("getDeviceData");
        }
      },
      fail: function(jqxhr, textStatus, error) {
        console.error(
          `API call to DELETE /api/device/${deviceId} unsuccessful. Error: ${
            jqxhr.responseJSON.detail
          }`
        );
      }
    });
  },

  // Persist data to the PublicDeviceModel on the server
  persistPublicDeviceModel(context, devicePublicModel) {
    // debugger

    var obContract = "";
    if (devicePublicModel.obContract) obContract = devicePublicModel.obContract;

    var renterUser = "";
    if (devicePublicModel.renterUser) obContract = devicePublicModel.renterUser;

    // Create a publicDeviceModel from data in the store.
    var tmpModel = {
      ownerUser: devicePublicModel.ownerUser,
      renterUser: renterUser,
      privateData: devicePublicModel.privateData,
      obContract: obContract,
      // rentStartDate: '',
      // rentStopDate: '',
      deviceName: devicePublicModel.deviceName,
      deviceDesc: devicePublicModel.deviceDesc
      // rentHourlyRate: '',
      // subdomain: '',
      // httpPort: '',
      // sshPort: '',
      // memory: testModel.memory,
      // diskSpace: testModel.diskSpace,
      // processor: testModel.processor,
      // internetSpeed: testModel.internetSpeed
      // checkinTimeStamp: testModel.checkinTimeStamp
    };

    // JSON.stringify(tmpModel, null, 2)

    // Upload the data to the server.
    $.post(
      "/api/devicePublicData/" + devicePublicModel._id + "/update",
      tmpModel,
      function(publicData) {
        // debugger
        console.log(`devicePublidModel ${publicData.collection._id} updated.`);
      }
    ).fail(function(jqxhr, textStatus, error) {
      // debugger
      console.error(
        "API call to /devicePublicData/" +
          devicePublicModel._id +
          "/update unsuccessful. Error: " +
          jqxhr.responseJSON.detail,
        error
      );
      throw error;
    });
  }
};

// Call the /device/listbyid/:id API.
async function getDevicesById(context) {
  return new Promise(function(resolve, reject) {
    const token = context.state.userInfo.token;

    $.ajax({
      type: "GET",
      url: `/api/devices/listbyid`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      success: handleSuccess,
      dataType: "json",
      error: handleError
    });

    function handleSuccess(data, textStatus, jqXHR) {
      //debugger
      resolve(data.devices);
    }

    function handleError(err) {
      debugger;
      reject(err);
    }
  });
}
