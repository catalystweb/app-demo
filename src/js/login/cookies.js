  
  var getURL = window.location.href;
  if (getURL.indexOf("localhost") >-1) {
    var localHost = "http://localhost:1488/users/";
  } else {
    var localHost = getURL+"users/";
  }
  
  var cookies = Cookies.get('user');
  var theme = Cookies.get('theme');
  var menu = Cookies.get('menu');
  var validatepass = Cookies.get('validatepass');
  var fileuploaded = Cookies.get('fileuploaded');
  var tutorial = Cookies.get('tutorial');
  var path = "css/";

  if (!tutorial) {
    var currentUser = "";
    currentUser += "<li class='current-user' style='cursor:pointer;color:darkred;font-weight:bold;'>*Click here for the tutorial*</li>";
    $(".current-user").replaceWith(currentUser); 
  }

  if (cookies == 'true') {
      if (theme == "dark") {
        $("#dark").prop("checked",true);
        $('link[href="'+path+'dark-theme.css"]').prop("disabled", false);
        $('link[href="'+path+'light-theme.css"]').prop("disabled", true);
      }  else {
        theme == "light"
        $("#light").prop("checked",true);
        $('link[href="'+path+'dark-theme.css"]').prop("disabled", true);
        $('link[href="'+path+'light-theme.css"]').prop("disabled", false);
      }
      if (menu == "right") {
        $("#swMenu").attr( 'checked', true )
        $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-left");
        $("header").removeClass("slideDown");
      }
      if (validatepass != null) {
            $.ajax({
                url: localHost,
                cache: false,
                data: {},
                dataType: "jsonp",
                success: function (result) {  
                    $.each(result, function (index, data) {
                        if (cookies == 'true') {
                            if (validatepass == data.password) {
                                  var payload = { 
                                    id: data.id,
                                    name: data.name,
                                    title: data.title,
                                    email: data.email,
                                    password: data.password,
                                    avatar: data.avatar,
                                    extension: data.extension,
                                    status: "online",
                                    block: data.block 
                                  };
                                $.ajax({
                                  url: localHost +data.id,
                                  type: "PUT",
                                  data: JSON.stringify(payload), 
                                  dataType: "json",             
                                  contentType: "application/json",
                                  success: function(result) {
                                    var currentUser = "";
                                    currentUser += "<li class='current-user'>current user: "+ data.name +" </li>";
                                    $(".current-user").replaceWith(currentUser);   
                                    getData(cookies,tutorial);
                                  }         
                                });           
                            }
                        }
                    });                  
                }
            });
        } 
  } else {       
    if (fileuploaded == 'true') {
      //$(".side-menu-wrapper").css("height","141px");
      getData(cookies,tutorial);
    } else {  
      //$(".side-menu-wrapper").css("height","141px");
      $("#login-modal").fadeIn("fast");
    }
  }  