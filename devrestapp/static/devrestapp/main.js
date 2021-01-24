$(document).ready(function () {
    /*
        $("#edetailbtn").click(function () {
            $.ajax({
                type: "PUT",
                url: "/employees/4",
                data: {
                    firstname: "Tommy",
                    lastname: "Griffin",
                    emp_id: 100
                },
                success: function (result) {
                    console.log(result)
                }
            });
        });
    */
    $('#edetailbtn').hide();
    $('#emodify').hide();
    $('#eadd').hide();
    $('#schange').hide();
    $('#cchange').hide();
    $('#sadd').hide();
    $('#delete').hide();
    $("div").click(function () {
        $.ajax({
            url: "/employees/",
            success: function (result) {
                console.log(result)
                names = ""
                result.forEach(elem => names += "<tr> <td><input type='radio' id=" + elem["id"] + " name='eid' value =" + elem["id"] + " ></td> <td>" + elem["firstname"] + "</td></tr>")
                $("p").html("<table  style=\'width:50%\'>" + names + "</table>");
                $('#edetailbtn').show();
                $('#emodify').show();
                $('#eadd').show();
                $('#delete').show();
            }
        });
    });

    $("#edetailbtn").click(function () {
        $.ajax({
            type: "GET",
            url: "/employees/" + $("input[name='eid']:checked").val(),
            success: function (result) {
                var content = result['firstname'] + " " + result['lastname'] + "\nContact Number :" + result['contactno'] + "\nDepartment : " + result['deptno'] + "\nOffice :" + result['office_city']
                $("p").html(
                    "<textarea id='edetail' name='edetail' rows='4' cols='50'></textarea>");
                $('#edetailbtn').hide();
                $("#schange").hide();
                $("#cchange").hide();
                $("#edetail").val(content);
                $('#emodify').hide();
                $('#delete').hide();
                $('#eadd').hide();
                $('#cchange').show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("You have not selected employee");
                
            }
        });
    });

    $("#emodify").click(function () {
        $.ajax({
            type: "GET",
            url: "/employees/" + $("input[name='eid']:checked").val(),
            success: function (result) {
                var eno = result['id']
                var fname = result['firstname']
                var lname = result['lastname']
                var contact = result['contactno']
                var dno = result['deptno']
                var ofcity = result['office_city']
                $("p").html(
                    "<input type='text' id='eno' name='eno'>" +
                    "<label for='firstname'>First name:</label><input type='text' id='firstname' name='firstname'><br> " +
                    "<label for='lastname'>Last name:</label><input type='text' id='lastname' name='lastname'><br>" +
                    "<label for='contact'>Contact No:</label> <input type='text' id='contact' name='contact'> <br>" +
                    "<label for='deptno'>Dept No:</label> <input type='text' id='deptno' name='deptno'> <br>" +
                    "<label for='ofno'>Office city:</label> <input type='text' id='ofno' name='ofno'><br>"
                );
                $("#eno").val(eno);
                $("#eno").hide();
                $("#firstname").val(fname);
                $("#lastname").val(lname);
                $('#contact').val(contact);
                $("#deptno").val(dno);
                $("#ofno").val(ofcity);
                $('#edetailbtn').hide();
                $('#emodify').hide();
                $('#eadd').hide();
                $('#delete').hide();
                $('#schange').show();
                $('#cchange').show();

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("You have not selected employee");
                
            }
        });
    });

    $("#schange").click(function () {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        $.ajax({
            type: "PUT",
            headers: { 'X-CSRFToken': csrftoken },
            url: "/employees/" + $("#eno").val(),
            data: {
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                contactno: $('#contact').val(),
                deptno: $("#deptno").val(),
                office_city: $("#ofno").val()
            },
            success: function (result) {
                alert("Record is updated.");
                location.reload();
            }
        });
    });

    $("#cchange").click(function () {
        location.reload();
    });

    $("#eadd").click(function () {
        $.ajax({
            type: "GET",
            url: "/employees/",
            success: function (result) {
                $("p").html(
                    "<label for='firstname'>First name:</label><input type='text' id='firstname' name='firstname'><br> " +
                    "<label for='lastname'>Last name:</label><input type='text' id='lastname' name='lastname'><br>" +
                    "<label for='contact'>Contact No:</label> <input type='text' id='contact' name='contact'> <br>" +
                    "<label for='deptno'>Dept No:</label> <input type='text' id='deptno' name='deptno'> <br>" +
                    "<label for='ofno'>Office city:</label> <input type='text' id='ofno' name='ofno'><br>"
                );
                $('#edetailbtn').hide();
                $('#emodify').hide();
                $('#eadd').hide();
                $('#schange').hide();
                $('#delete').hide();
                $('#cchange').show();
                $('#sadd').show();
            }
        });
    });

    $("#sadd").click(function () {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log(csrftoken)
        $.ajax({
            type: "POST",
            headers: { 'X-CSRFToken': csrftoken },
            url: "/employees/",
            data: {
                firstname: $("#firstname").val(),
                lastname: $("#lastname").val(),
                contactno: $('#contact').val(),
                deptno: $("#deptno").val(),
                office_city: $("#ofno").val()
            },
            success: function (result) {
                alert("Record is added.");
                location.reload();
            }
        });

    });

    $("#delete").click(function () {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log(csrftoken)
        $.ajax({
            type: "DELETE",
            headers: { 'X-CSRFToken': csrftoken },
            url: "/employees/" + $("input[name='eid']:checked").val(),
            success: function (result) {
                alert('Record is Deleted.');
                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("You have not selected employee");
                
            }
        });
    });

})