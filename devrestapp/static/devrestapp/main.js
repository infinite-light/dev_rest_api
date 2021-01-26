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
    $('#gpqldtl').hide();
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
                $('#gpql').hide();
                $('#cchange').show()
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
                $('#e_id').hide();
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
                    "<label for='contact'>Contact No:</label><input type='text' id='contact' name='contact'> <br>" +
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
    $("#gpql").click(function () {
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            crossDomain: true,
            data: JSON.stringify({
                query:
                    `{
                      employeeList{
                        id
                        firstname
                      }
                    }`
            }),
            //   .then(res => res.JSON())
            //  .then(data => {
            //       data.data.employeeList.forEach(emp => {
            //           const option = document.createElement('option')
            //           option.value = employeeList.id
            //           option.innerText = employeeList.firstname
            //           e_id.append(option)
            //      })
            //  }),  
            success: function (result) {
               /*
                names = "<label for='e_id'>Select Employee Name:</label><select name='e_id' id='e_id'>"
                var result = JSON.stringify(result);
                (data => {
                    data.data.employeeList.forEach(emp => {
                        names += "<option value=" + employeeList.id + ">" + employeeList.firstname + "</option>"
                    });
                })
                $("p").html(names + "</select>");
                */
                //console.log(result)
                //names = "<label for='e_id'>Select Employee Name:</label><select name='e_id' id='e_id'>"
                //result.forEach(elem => names += "<option value=" + result['data']['employeeList']['id'] + ">"+ result['data']['employeeList']['firstname'] +"</option>" )
                //result.forEach(elem => names += "<option value=" + elem["id"] + ">"+ elem["firstname"] +"</option>" ) 
                //$("p").html( names + "</select>");
                $("p").html("<label for=''e_id''>'emp id'</label><input type='text' id='e_id' name='e_id'></input>")
                //  alert("Swami")
                $('#gpqldtl').show();
                $('#cchange').show()
                $('#gpql').hide();
            }
        });
    });
    $("#gpqldtl").click(function () {
        var eid = $('#e_id').val()
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            crossDomain: true,
            data: JSON.stringify({
                query:
                    `{
                    allEmployees(id: ${eid} ) {
                        firstname
                        lastname
                        deptno { deptname }
                        officeCity { officeCity }
                    }
                }`
            }),
            success: function (result) {
                var content = result['data']
                //   var firstName = result['data']['allEmployees']['firstname']
                //   alert(firstName)
                $("p").html("<textarea id='info' name='info' rows='5' cols='50'></textarea>");
                $("#info").text(JSON.stringify(content));
                $('#cchange').show();
                $('#gpqldtl').hide();
            }

        });
    });
})