$(window).on("load", function () {
  $("#searchField").val("");
  $("#login-modal").fadeIn("fast");
  $("input").val('');
  $("select").val('');

  function getData() {
    var localHost = "http://localhost:1352/users/";
      //hide any existing modal 
      if ($(".modal-container").is(":visible")) {
        $("#del-modal").fadeOut("fast");
        $("#add-modal").fadeOut("fast");
        $("#block-modal").fadeOut("fast");
        $("#edit-modal").fadeOut("fast");
        $(".user-success").fadeOut("fast");
        $(".page-container").css("opacity", "1");
      };

      //clear existing field values
      $("input").val('');
      $("select").val('');
      if (!$('#swMenu').is(":checked")) { 
        $('input[type=checkbox]').prop('checked',false);
      }
      //global json data source
      var userData = "";
      userData +=
        '<div class="user-nodata" style="height:100%;">' +
        "<strong> loading data </strong>" +
        "</div>";
      $(".content-wrapper").html(userData);      

      $.ajax({
        url: localHost,
        cache: false,
        data: {},
        dataType: "jsonp",
          success: function (result) {  
              userData = "";
              $.each(result, function (index, data) {
                if (data.block !== "true") { 
                  userData +=
                    "<section id=" +
                    data.id +
                    " class='sort-class'>" +
                    '<div class="user-wrapper">' +
                    '<div class="user-container">' +
                    '<div class="user-img-container">' +
                    '<div class="user-avatar ' + data.avatar + '" data-name="' + data.avatar + '"></div >' +
                    '<div class="user-status ' + data.status + '"></div>' +
                    '</div >' +
                    '<div class="user-info"><div>' +
                    '<input class="user-name" data-name="'+ data.name + '" value="' + data.name + '"></input><span class="hideshow display-inline padding-left-10"><i class="fas fa-arrow-left"></i></span>' +
                    '<input class="user-title" value="' + data.title + '"></input>' +
                    '</div>' +
                    '<button class="user-button transition">Block</button>' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</section>";
                }
              });
                //apply result to html element
                $(".content-wrapper").html(userData);
                //sort desc by default html element and append
                $(".sort-class").sort(function (a, b) {
                  return String.prototype.localeCompare.call(
                    $(a).find("input.user-name").data("name").toLowerCase(),
                    $(b).find("input.user-name").data("name").toLowerCase()
                  );
                }).appendTo(".content-wrapper");
                $(".content-wrapper").fadeIn("slow");
                $("footer").fadeIn("slow");
          },
          error: function () {
            userData = "";
            userData +=
              '<div class="user-nodata" style="height:100%;">' +
              "<strong> error loading external data </strong>" +
              "</div>";
            $(".content-wrapper").html(userData);            
            $(".content-wrapper").fadeIn("slow");
            $("footer").fadeIn("slow");
          }        
      });
  }
  getData();

  function login(dataEmail,dataPass) {
    //jquery click listener for login modal
      var localHost = "http://localhost:1352/users/";
      $(document).on("click", function (e) {  

        if (e.target.id == "login-button") {
          $.ajax({
              url: localHost,
              cache: false,
              dataType: "json",
              success: function (result) {
                $.each(result, function (index, data) {      
                  console.log("dataEmail: " + dataEmail + " data.email: " + data.email + " dataPass: " + dataPass + " data.password: " + data.password);
                    if (dataEmail == data.email && dataPass == data.password) {
                      Cookies.set('user','true');
                      console.log("cookie added: " + Cookies.get('user'));
                      return
                    }
                });
              }   
          });          
        }      
      });
  }
  login();
  
  //display json data source for block list
  function getBlockData() {
    var localHost = "http://localhost:1352/users/";
    var userBlock = "<option value=''>Select blocked user from list</option>";

    $.ajax({
      url: localHost,
      cache: false,
      data: {},
      dataType: "jsonp",
      success: function (result) {
        $.each(result, function (index, data) {
          if (data.block == "true") {
            userBlock +=
              "<option id='" + data.id + "' value='" + data.name + "'>" + data.name + "</option>";
          }
          $("#block-list").html(userBlock);
        });
      }
    });
  }
  getBlockData();

  //display json data source for delete list
  function getDelData() {
    var localHost = "http://localhost:1352/users/";
    var userDel =
      "<option value='' selected='false'>Select user from list</option>";

    $.ajax({
      url: localHost,
      cache: false,
      data: {},
      dataType: "jsonp",
      success: function (result) {
        $.each(result, function (index, data) {
          userDel +=
            "<option id='" + data.id + "' value='" + data.name + "'>" + data.name + "</option>";
          $("#del-list").html(userDel);
        });
      }
    });
  }
  getDelData();

  //show user add or delete successfully modal 
  function userAddDel() {
    $(".user-mod").css("display","none");
    $(".user-success").fadeIn("fast");
    setTimeout(function () {
      $(".content-wrapper").css("display","none");
      $("footer").css("display","none");
      getData();
      getDelData();
      getBlockData();
    },2000);
  }


  //update json data when display values changed  
  function userDirectAdd(getClass,getText,getID) {
      var localHost = "http://localhost:1352/users/";
      
      //update json data with new name value
      if (getClass == "user-name") {
        $.ajax({
          url: localHost,
          cache: false,
          dataType: "json",
          success: function (result) {
            $.each(result, function (index, data) {             
              if (getText != data.name) {
                if (getID == data.id) {                
                    var payload = { 
                      id: data.id,
                      name: getText,
                      title: data.title,
                      avatar: data.avatar,
                      status: data.status,
                      block: data.block 
                    };
                  $.ajax({
                    url: localHost +getID,
                    type: "PUT",
                    data: JSON.stringify(payload), 
                    dataType: "json",             
                    contentType: "application/json",
                    success: function(result) {
                      $("#edit-modal").fadeIn("fast");
                      $(".page-container").css("opacity","0.3");
                      userAddDel()
                    }         
                  });
                  return
                }
              }
            });  
          }   
        });
      
      //update json data with new title value
      } else {
        $.ajax({
          url: localHost,
          cache: false,
          dataType: "json",
          success: function (result) {
            $.each(result, function (index, data) {    
              if (getText != data.title) {          
                if (getID == data.id) {                
                    var payload = { 
                      id: data.id,
                      name: data.name,
                      title: getText,
                      avatar: data.avatar,
                      status: data.status,
                      block: data.block 
                    };
                  $.ajax({
                    url: localHost +getID,
                    type: "PUT",
                    data: JSON.stringify(payload), 
                    dataType: "json",             
                    contentType: "application/json",
                    success: function() {
                      $("#add-modal").fadeIn("fast");
                      $(".page-container").css("opacity","0.3");
                      userAddDel()
                    }         
                  });
                  return;
                }
              }
            });  
          }   
        });   
      }
  }

  //add or edit data from submit button to json source
  function userAddEdit(getName,getID) {
    var localHost = "http://localhost:1352/users/";    
    
    //update json data with new avatar value 
    if (getName != null) {
      var editAvatar = $("#edit-avatar option:selected").val(); 
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) { 
            if (getID == data.id) {
                var payload = { 
                  id: data.id,
                  name: data.name,
                  title: data.title,
                  avatar: editAvatar,
                  status: data.status,
                  block: data.block 
                };
              $.ajax({
                url: localHost +getID,
                type: "PUT",
                data: JSON.stringify(payload), 
                dataType: "json",             
                contentType: "application/json",
                success: function(result) {
                  $("#add-modal").fadeIn("fast");
                  $(".page-container").css("opacity","0.3");
                  userAddDel()
                }         
              });                    
              return  
            } 
          });            
        }
      });
    
    //add new record to json data 
    } else {            
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(99999));
      }      
      var dataName = $("#add-name").val();
      var dataTitle = $("#add-title").val();
      var dataEmail = $("#add-email").val();
      var dataAvatar = $("#add-avatar option:selected").val();           
      var payload = {
          name: dataName,
          title: dataTitle,
          email: dataEmail,
          password: ""+getRandomInt(9999)+"",
          avatar: dataAvatar,
          status: "offline",
          block: "false"
      };
      $.ajax({
          url: localHost,
          type: "POST",
          data: JSON.stringify(payload),
          dataType: "json",
          contentType: "application/json",
          success: function() {
            userAddDel()
          }
      });      
    }
}       

  //onclick event handler for api interactions
  $(document).on("click", function (e) {
    var localHost = "http://localhost:1352/users/";
    
    //delete user from json source
    if (e.target.id == "del-button") {
      var userID = $("#del-list").children(":selected").attr("id");  
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) {              
            if (userID == data.id) {
                var payload = delete data.id;             
              $.ajax({
                url: localHost+userID,
                type: "DELETE",
                dataType: "json", 
                data: payload,               
                contentType: "application/json",
                success: function() {
                  userAddDel() 
                }         
              });
              return;
            }
          });  
        }   
      });
    } 
    //remove user from block list on json source 
    if (e.target.id == "del-block-button") {
      var userID = $("#block-list").children(":selected").attr("id");
      $.ajax({
        url: localHost,
        cache: false,
        dataType: "json",
        success: function (result) {
          $.each(result, function (index, data) {              
            if (userID == data.id) {                
                var payload = { 
                  id: data.id,
                  name: data.name,
                  title: data.title,
                  avatar: data.avatar,
                  status: data.status,
                  block: "false" 
                };
              $.ajax({
                url: localHost+userID,
                type: "PUT",
                data: JSON.stringify(payload), 
                dataType: "json",             
                contentType: "application/json",
                success: function() {
                  userAddDel(); 
                }         
              });
              return;
            }
          });  
        }   
      });
    }
    //add user to block list on json source 
    if ($(e.target).hasClass("user-button")) {
        $(e.target).closest("section").fadeOut("slow");
        var secID = $(e.target).closest("section").attr("id");
        $.ajax({
          url: localHost,
          cache: false,
          dataType: "json",
          success: function (result) {
            $.each(result, function (index, data) {              
              if (secID == data.id) {                
                  var payload = { 
                    id: data.id,
                    name: data.name,
                    title: data.title,
                    avatar: data.avatar,
                    status: data.status,
                    block: "true" 
                  };
                $.ajax({
                  url: localHost +secID,
                  type: "PUT",
                  data: JSON.stringify(payload), 
                  dataType: "json",             
                  contentType: "application/json",
                  success: function() {
                    getBlockData()
                  }         
                });
                return;
              }
            });  
          }   
        });
      } 
  });    

  //onblur event handler callback for editable input
  $(document).on("blur", ".user-name, .user-title", function() { 
    var classVal = $(this).attr("class");
    var textVal = $(this).val();
    var idVal = $(this).closest("section").attr("id");
    $(this).each(function(){
      var value = $(this).val();
      var size  = value.length;      
      size = size*2; // average width of a char
      $(this).css('width',size*6);    
    });
    userDirectAdd(classVal,textVal,idVal);
  });

  
  //regex function for email validation
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }     

   //jquery change listener for login modal
  $(document).on("change", "input", function() {
    if ($(".modal-login").is(":visible")) {
        $("#login-modal input[type='email'], #login-modal input[type='password']").bind("keyup change", function () {
            if ($("#login-email").val() != "" && $("#login-password").val() != "") {
                console.log($("#login-email").val());
                console.log($("#login-password").val());
                var email = $("#login-email").val();
                if (validateEmail(email)) {
                $("button").prop("disabled", false);
                $("#login-button").fadeIn("fast");
                }
            } else {
                $("button").prop("disabled", true);
                $("#login-button").fadeOut("fast");
            }
        });
    }
  }); 


  //click event handler with callback dependancies
  $(document).on("click", function (e) {
    //add button callback
    if (e.target.id == "add-button") {
      userAddEdit(null,null);
    }
    //login button callback
    if (e.target.id == "login-button") {
      var dataEmail = $("#login-email").val();
      var dataPass =  $("#login-password").val();
      console.log(dataEmail);
      console.log(dataPass);
      login(dataEmail,dataPass);
    }

    //logout modal display
    if (e.target.id == "log-out") {
        $("#logout-button").fadeIn("fast"); 
        $("#logout-button").on("click", function() {
          $("#logout-modal").fadeOut("fast");
          login(true);
        });                 
    }   

    //avatar edit display
    if ($(e.target).hasClass("user-avatar")) {
      var dataName = $(e.target).parent().next("div").find(".user-name").data("name");
      var dataID = $(e.target).parent().parent().parent().parent("section").attr("id");
      $("#edit-modal").fadeIn("fast");
      $(".user-mod").fadeIn("fast");
      $(".page-container").css("opacity","0.3");
      $("#edit-avatar").on("change", function () {  
        if ($("#edit-avatar option").filter(":selected").text() != "Select Avatar") {
          $("#edit-button").fadeIn("fast");
          $("#edit-button").on("click", function () {
            userAddEdit(dataName,dataID);
          });
        }
      });   
    }          
  });
});

//filter function for filtering displayed data via input field
function filterFunction() {
  var input, filter, selector, userData;
  input = document.getElementById("searchField");
  filter = input.value.toLowerCase();
  selector = document.getElementsByTagName("section");

  for (i = 0; i < selector.length; i++) {
    getName = selector[i].getElementsByClassName("user-name")[0];
    nameVal = getName.value || getName.innerText;
    if (nameVal.toLowerCase().indexOf(filter) > -1) {
      selector[i].style.display = "";
    } else {
      selector[i].style.display = "none";
    }
    if ($(selector).is(":visible") == false) {
      $("#noData").css("display", "flex");
    } else {
      $("#noData").css("display", "none");
    }
  }
}
