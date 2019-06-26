$(window).on("load", function () {
    //logo hover event handler 
    $(".logo").hover(function () {
        $(".catalyst").animate({width: 'toggle'});
    });
    
    //hide login button on load
    if ($("#login-button").is(":visible")) {
        $("#login-button").css("display","none");
    }      

    //jquery global hover event handler
    $(document).on("mouseover", ".user-name", function () {
        $(this).next("span").children("i").css("display","inline-block").animate({"margin-left":"0px"}, 200);
        $(this).next("span").children("i").fadeIn("fast");
        return false;
    });
    $(document).on("mouseleave",".user-name", function () {
        $(this).next("span").children("i").css("display","inline-block").animate({"margin-left":"20px"}, 200);
        $(this).next("span").children("i").fadeOut("fast");
        return false;
    });

    //jquery global click event handler
    $(document).on("click", function(e) {
        if (e.target.id == "add-user") {
        $(".modal-container").fadeOut("fast");
        $("#add-modal").fadeIn("fast");
        $(".user-mod").fadeIn("fast");
        $(".page-container").css("opacity", "0.3");
    
        }
        if (e.target.id == "del-user") {
        $(".modal-container").fadeOut("fast");
        $("#del-modal").fadeIn("fast");
        $(".user-mod").fadeIn("fast");
        $(".page-container").css("opacity", "0.3");
        }
        if (e.target.id == "block-user") {
        $(".modal-container").fadeOut("fast");
        $("#block-modal").fadeIn("fast");
        $(".user-mod").fadeIn("fast");
        $(".page-container").css("opacity", "0.3");
        }
        if (e.target.id == "change-theme") {
        $(".modal-container").fadeOut("fast");
        $("#change-theme").fadeIn("fast");
        $(".page-container").css("opacity", "0.3");
        }
        if (e.target.id == "submit-theme") {
            if ($("#dark").is(":checked")) {
                $('link[href="src/css/dark-theme.css"]').prop("disabled", false);
                $('link[href="src/css/light-theme.css"]').prop("disabled", true);
            } else {
                $('link[href="src/css/dark.theme.css"]').prop("disabled", true);
                $('link[href="src/css/light-theme.css"]').prop("disabled", false);
            }
            if ($('#swMenu').is(":checked")) {        
                $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-left");
                $("header").removeClass("slideDown");
            } else {
                $(".arrow-icon").removeClass("arrow-spin-right").addClass("arrow-spin-up");
                $(".side-menu-wrapper").removeClass("slideIn");
            }
            $("#change-theme").fadeOut("fast");
            $(".page-container").css("opacity", "1");
        } 
        //add modal display
        if (e.target.id == "add-user") {
            if ($("#add-button").is(":visible")) {
            $("#add-button").css("display","none");
            }
            $(this).on("input", function () {  
                $("#add-modal input[type='text']").bind("keyup change", function () {
                    if ($("#add-name").val() != "" && $("#add-title").val() != "") {
                        $("button").prop("disabled", false);
                        $("#add-button").fadeIn("fast");
                    } else {
                        $("button").prop("disabled", true);
                        $("#add-button").fadeOut("fast");
                    }
                });
            });      
        }

        //block modal display
        if (e.target.id == "block-user") {
            if ($("#del-block-button").is(":visible")) {
            $("#del-block-button").css("display","none");
            }
            $("#block-list").on("change", function () {  
            if ($("#block-list option").filter(":selected").text() != "Select blocked user from list") {
                $("#del-block-button").fadeIn("fast");
            } else {
                $("#del-block-button").fadeOut("fast");
            }
            });
        }
        
        //delete modal display
        if (e.target.id == "del-user") {
            if ($("#confirm-del").is(":visible")) {
                $("#confirm-del").css("display","none");
                $("#del-button").css("display","none");
            }
            $("#del-list").on("change", function () {  
            if ($("#del-list option").filter(":selected").text() != "Select user from list") {
                $("#confirm-del").fadeIn("fast");
            } else {
                $("#confirm-del").fadeOut("fast");
                $("#checkbox-state").prop("checked",false);
                $("#del-button").fadeOut("fast");
            }
            });
        }    
        if (e.target.id == "checkbox-state") {
            if ($("#checkbox-state").prop("checked") == true) {
                $("#del-button").fadeIn("fast");
            } else {
                $("#del-button").fadeOut("fast");
            }
        }

        //arrow spin style for sorting
        if (e.target.classList[0] == "arrow-icon") {
            if ($(".side-menu-wrapper").is(":visible")) {
                $("#del-modal").fadeOut("fast");
                $("#add-modal").fadeOut("fast");
                $("#block-modal").fadeOut("fast");
                $("#edit-modal").fadeOut("fast");
                $(".user-success").fadeOut("fast");
            }
            if ($('#swMenu').is(":checked")) {
                if ($(".arrow-spin-left").is(":visible")) {
                    $(".side-menu-wrapper").css("display","flex");
                    setTimeout(function () {
                    $(".side-menu-wrapper").removeClass("slideOut").addClass("slideIn");
                    },100);
                    $(".arrow-icon").removeClass("arrow-spin-left").addClass("arrow-spin-right");
                    $(".page-container").css("opacity", "0.3");
                } else {
                    $(".side-menu-wrapper").removeClass("slideIn").addClass("slideOut");
                    $(".arrow-icon").removeClass("arrow-spin-right").addClass("arrow-spin-left");
                    $(".page-container").css("opacity", "1");
                    setTimeout(function () {
                    $(".side-menu-wrapper").css("display","none");
                    },200);
                }
            } else {
                if ($("header").hasClass("slideDown")) {
                    $("header").removeClass("slideDown");
                    $(".arrow-icon").removeClass("arrow-spin-left");
                    $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-up");
                } else {
                    $("header").addClass("slideDown");
                    $(".side-menu-wrapper").removeClass("slideIn").addClass("slideOut");
                    $(".arrow-icon").removeClass("arrow-spin-right");
                    $(".arrow-icon").removeClass("arrow-spin-up").addClass("arrow-spin-down");
                }
            }
        }
        if (e.target.classList[0] == "sort" || e.target.classList.contains('arrow-sort')) {
            if ($(".arrow-sort").hasClass("arrow-spin-down")) {
                $(".arrow-sort").removeClass("arrow-spin-down");
                $(".arrow-sort").addClass("arrow-spin-up");
            } else {
                $(".arrow-sort").removeClass("arrow-spin-up");
                $(".arrow-sort").addClass("arrow-spin-down");
            }
        }

        //close statement if user clicks close icon
        if (e.target.classList[0] == "close") {
            $(".modal-container").fadeOut("fast");
            if (! $('input[type="radio').is(':radio')) {
                $("input").val('');
            }
            if($(".login-container").is(":visible")) {
                $(".login-container").fadeOut("fast");
                $(".content-wrapper").fadeIn("slow");
                $(".page-container").css("opacity","1");
                $(".header-container").css("opacity","1");
                $("footer").fadeIn("slow");
            }
            $("select").val('');
            $(".page-container").css("opacity", "1");
        }

        // call sort function for asc and desc on click event    
        if (e.target.classList[0] == "sort" || e.target.classList.contains('arrow-sort')) {
            var getStateVal = document.getElementsByClassName("sort-list")[0].id;    
            $(".sort-class").sort(function (a, b) {
                if (getStateVal == "sort-asc") {
                    document.getElementsByClassName("sort-list")[0].id = "sort-des";
                    return String.prototype.localeCompare.call(
                        $(a).find("input.user-name").data("name").toLowerCase(),
                        $(b).find("input.user-name").data("name").toLowerCase()
                    );
                } else {
                    document.getElementsByClassName("sort-list")[0].id = "sort-asc";
                    return String.prototype.localeCompare.call(
                        $(b).find("input.user-name").data("name").toLowerCase(),
                        $(a).find("input.user-name").data("name").toLowerCase()
                    );
                }
            }).appendTo(".content-wrapper");
        } 
    });

    //key function if menu open close during filter function
    $(document).keyup(function (e) {
        if (e.target.id == "searchField") {
            if ($("header").hasClass("slideDown")) {
                $("header").removeClass("slideDown");
                $(".arrow-icon").removeClass("arrow-spin-down").addClass("arrow-spin-up");
            }
        }
        if ($(".modal-container").is(":visible")) {
            if (e.key === "Escape") {
                $(".modal-container").fadeOut("fast");
                if (! $('input[type="radio').is(':radio')) {
                    $("input").val('');
                }
                if($(".login-container").is(":visible")) {
                    $(".login-container").fadeOut("fast");
                    $(".content-wrapper").fadeIn("slow");
                    $(".page-container").css("opacity","1");
                    $(".header-container").css("opacity","1");
                    $("footer").fadeIn("slow");
                }
                $("select").val('');
                $(".page-container").css("opacity", "1");
            }
        }
    });
    
    // prevent enter key creating new line for editable input field //
    $(document).on("keypress", ".user-name, .user-title", function(e) {
        if (e.which == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
});