$(document).ready(function () {
    $('#edetailbtn').hide();
    $('#emodify').hide();
    $('#eadd').hide();
    $('#schange').hide();
    $('#cchange').hide();
    $('#sadd').hide();
    $('#delete').hide();
    $('#gpqldtl').hide();

    $("#mydiv").click(function () {
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            crossDomain: true,
            headers: { 'x-version-number': '1.2' },
            data: JSON.stringify({
                query: `{
                    allEmployee{
                      id
                      firstname
                    }
                  }`
            }),
            success: function (result) {
                /*
                names = "<label for='e_id'>Select Employee Name:</label><select name='e_id' id='e_id'>"
                result['data']['allEmployee'].forEach(elem => names += "<option value=" + elem['id'] + ">"+ elem['firstname'] +"</option>" )
                //console.log(names)
                $("p").html( names + "</select>");
                $('#e_id').show();
                */
                names = ""
                result['data']['allEmployee'].forEach(elem => names += "<tr> <td><input type='radio' id=" + elem['id'] + " name='eid' value =" + elem["id"] + " ></td> <td>" + elem["firstname"] + "</td></tr>")
                //result.forEach(elem => names += "<tr> <td><input type='radio' id=" + elem["id"] + " name='eid' value =" + elem["id"] + " ></td> <td>" + elem["firstname"] + "</td></tr>")
                $("p").html("<table  style=\'width:50%\'>" + names + "</table>");
                $('#gpqldtl').hide();
                $('#cchange').show()
                $('#gpql').hide();
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
        var eid = $("input[name='eid']:checked").val()
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            headers: { 'x-version-number': '1.3' },
            crossDomain: true,
            data: JSON.stringify({
                query:
                    `{
                            employee(id: ${eid}) {
                            firstname
                            lastname
                            contactno
                            deptno { deptname }
                            officeCity { officeCity }
                            empemail
                        }
                    }`
            }),
            success: function (result) {
                var content = result['data']
                var firstName = result['data']['employee']['firstname']
                var lastname = result['data']['employee']['lastname']
                var contactno = result['data']['employee']['contactno']
                var deptname = result['data']['employee']['deptno']['deptname']
                var officeCity = result['data']['employee']['officeCity']['officeCity']
                var empemail = result['data']['employee']['empemail']

                var Details = "Name: " + firstName + " " + lastname + "\nContct no: " + contactno + " email : " + empemail + "\nDepartment: " + deptname + "\nOffice: " + officeCity


                $("p").html("<textarea id='info' name='info' rows='5' cols='50'></textarea>");
                // $("#info").text(JSON.stringify(content));
                $("#info").text(Details);
                $('#cchange').show();
                $('#gpqldtl').hide();
                $('#edetailbtn').hide();
                $("#schange").hide();
                $("#cchange").hide();
                $('#emodify').hide();
                $('#delete').hide();
                $('#eadd').hide();
                $('#cchange').show();
                $('#gpqldtl').hide();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("You have not selected employee");
            }

        });
    });

    function depSelect() {
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            crossDomain: true,
            headers: { 'x-version-number': '1.2' },
            data: JSON.stringify({
                query: `{
                    allDepartment{
                      id,
                      deptname
                    }
                }`
            }),

            success: function (result) {
                dnames = "<label for='dept'>Department :</label><select name='dept' id='dept'>"
                result['data']['allDepartment'].forEach(elem => dnames += "<option value=" + elem['id'] + ">" + elem['deptname'] + "</option>")
                //console.log(names)
                $("#deptselect").html(dnames + "</select>");

            }
        });
    };


    function officeSelect() {
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            crossDomain: true,
            headers: { 'x-version-number': '1.2' },
            data: JSON.stringify({
                query: `{
                    allOffice{
                      id,
                      officeCity
                    }
                }`
            }),

            success: function (result) {

                onames = "<label for='office'>Office :</label><select name='office' id='office'>"
                result['data']['allOffice'].forEach(elem => onames += "<option value=" + elem['id'] + ">" + elem['officeCity'] + "</option>")
                //console.log(names)
                $("#officeselect").html(onames + "</select>");

            }
        });
    };

    $("#emodify").click(function () {
        depSelect();
        officeSelect();
        var eid = $("input[name='eid']:checked").val()
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            headers: { 'x-version-number': '1.3' },
            crossDomain: true,
            async: false,
            data: JSON.stringify({
                query:
                    `{
                            employee(id: ${eid}) {
                            firstname
                            lastname
                            contactno
                            deptno { id }
                            officeCity { id }
                            empemail
                        }
                    }`
            }),
            success: function (result) {
                var content = result['data']
                var firstName = result['data']['employee']['firstname']
                var lastname = result['data']['employee']['lastname']
                var contactno = result['data']['employee']['contactno']
                //var deptname = result['data']['employee']['deptno']["id"]
                var deptno = result['data']['employee']['deptno']["id"]
                var officeCity = result['data']['employee']['officeCity']["id"]
                var empemail = result['data']['employee']['empemail']

                $("p").html(
                    "<input type='text' id='eno' name='eno'>" +
                    "<label for='firstname'>First name:</label><input type='text' id='firstname' name='firstname'><br> " +
                    "<label for='lastname'>Last name:</label><input type='text' id='lastname' name='lastname'><br>" +
                    "<label for='contact'>Contact No:</label> <input type='text' id='contact' name='contact'> <br>" +


                    "<label for='empemail'>Email:</label> <input type='text' id='empemail' name='empemail'><br>"
                );

                $("#eno").val(eid);
                $("#eno").show();
                $("#firstname").val(firstName);
                $("#lastname").val(lastname);
                $('#contact').val(contactno);
                //$("#deptno").val(deptno);
                $("#dept").val(deptno);
                $("#office").val(officeCity);
                $("#empemail").val(empemail);
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

    function emp_exist(id, contact_no, email) {
        var retVal;
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            headers: { 'x-version-number': '1.3' },
            crossDomain: true,
            data: JSON.stringify({
                query: `{employeeofcontactno(contactno:\"${contact_no}\"){id, firstname, contactno, empemail}}`
            }),
            async: false,

            success: function (result) {
                if (result['data']['employeeofcontactno'] == null) {
                    alert("one");
                    retVal = true;
                    return true;
                }
                else {
                    var e_id = result['data']['employeeofcontactno']['id']
                    var firstName = result['data']['employeeofcontactno']['firstname']
                    //var contactnumber = result['data']['employeeofcontactno']['contactno']
                    var emailinfo = result['data']['employeeofcontactno']['empemail']

                    if (emailinfo == email && e_id != id) {
                        alert("two");
                        retVal = false;
                        return false;
                    }
                    else {
                        alert("three");
                        retVal = true;
                        return true;
                    }
                }
            },

            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.error);
                //console.log(query)
            }
        });


        return retVal;

    };

    $("#schange").click(function () {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        //console.log(csrftoken)
        var e_id = $("#eno").val();
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var contactno = $('#contact').val();
        var deptno = $("#dept").val();
        var office_city = $("#office").val();
        var empemail = $("#empemail").val();

        if (validphonenumber(contactno) && validemail(empemail)) {
            if (emp_exist(e_id, contactno, empemail) == true) {
                $.ajax({
                    type: "POST",
                    url: "/graphql/",
                    contentType: "application/graphql",
                    headers: { 'x-version-number': '1.3' },
                    crossDomain: true,
                    // data: `mutation{UpdateEmployee(id:\"${e_id}\",firstname: \"${firstname}\",lastname: \"${lastname}\",contactno: \"${contactno}\") {employee{id}}}`,
                    data: `mutation{UpdateEmployee(id:\"${e_id}\", firstname:\"${firstname}\", lastname:\"${lastname}\", contactno:\"${contactno}\", deptnoId:${deptno}, officeCityId:${office_city}, empemail:\"${empemail}\") {employee{id}}}`,
                    success: function (result) {
                        //   console.log(result)
                        alert("Record is Updateded.");
                        location.reload();
                    }
                });
            }
            else {
                alert("employee with same contact no and email address already exist.")
            }

        }

    });

    $("#cchange").click(function () {
        location.reload();
    });

    $("#eadd").click(function () {
        $("p").html(
            "<label for='firstname'>First name:</label><input type='text' id='firstname' name='firstname'><br> " +
            "<label for='lastname'>Last name:</label><input type='text' id='lastname' name='lastname'><br>" +
            "<label for='contact'>Contact No:</label><input type='text' id='contact' name='contact'> <br>" +
            "<label for='empemail'>Email:</label> <input type='text' id='empemail' name='empemail'><br>"
        );
        depSelect();
        officeSelect();
        $('#edetailbtn').hide();
        $('#emodify').hide();
        $('#eadd').hide();
        $('#schange').hide();
        $('#delete').hide();
        $('#cchange').show();
        $('#sadd').show();
    });



    function validemail(emailaddress) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (testEmail.test(emailaddress))
            return true;
        else
            alert("not a vilid email address.")
        return false;
    };


    function validphonenumber(number) {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (number.match(phoneno)) {
            return true;
        }
        else {
            alert("not a valid  phone number");
            return false;
        }
    };


    $("#sadd").click(function () {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        //console.log(csrftoken)
        var firstname = $("#firstname").val();
        var lastname = $("#lastname").val();
        var contactno = $('#contact').val();
        var deptno = $("#dept").val();
        var office_city = $("#office").val();
        var empemail = $("#empemail").val();
        var e_id="New";

        if (validphonenumber(contactno) && validemail(empemail)) {
            if (emp_exist(e_id, contactno, empemail) == true) {

                $.ajax({
                    type: "POST",
                    url: "/graphql/",
                    contentType: "application/graphql",
                    headers: { 'x-version-number': '1.3' },
                    crossDomain: true,
                    data: `mutation{CreateEmployee(firstname:\"${firstname}\", lastname:\"${lastname}\", contactno:\"${contactno}\", deptnoId:${deptno}, officeCityId:${office_city}, empemail:\"${empemail}\") {employee{id}}}`,
                    // data: `mutation{CreateEmployee(firstname: \"${firstname}\",lastname: \"${lastname}\",contactno: \"${contactno}\") {employee{id}}}`,
                    success: function (result) {
                        alert("Record is added.");
                        location.reload();
                    }
                });
            }
            else {
                alert("employee with same contact no and email address already exist.")
            }
        }
    });

    $("#delete").click(function () {
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        console.log(csrftoken)
        var eid = $("input[name='eid']:checked").val()
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/graphql",
            headers: { 'x-version-number': '1.3' },
            crossDomain: true,

            data: `mutation{DeleteEmployee(id:\"${eid}\"),{employee{id}}}`,
            success: function (result) {
                alert("Record is Deleted");
                location.reload();
            }
        });

    });




    $("#gpql").click(function () {
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            crossDomain: true,
            headers: { 'x-version-number': '1.2' },
            data: JSON.stringify({
                query: `{
                    allEmployee{
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
                names = "<label for='e_id'>Select Employee Name:</label><select name='e_id' id='e_id'>"
                result['data']['allEmployee'].forEach(elem => names += "<option value=" + elem['id'] + ">" + elem['firstname'] + "</option>")
                //console.log(names)
                $("p").html(names + "</select>");
                $('#gpqldtl').show();
                $('#cchange').show()
                $('#gpql').hide();
                $('#e_id').show();
            }
        });
    });



    $("#gpqldtl").click(function () {
        var eid = $('#e_id').val()
        $.ajax({
            type: "POST",
            url: "/graphql/",
            contentType: "application/json",
            headers: { 'x-version-number': '1.3' },
            crossDomain: true,
            data: JSON.stringify({
                query:
                    `{
                        employee(id: ${eid}) {
                        firstname
                        lastname
                        contactno
                        deptno { deptname }
                        officeCity { officeCity }
                    }
                }`
            }),
            success: function (result) {
                var content = result['data']
                var firstName = result['data']['employee']['firstname']
                var lastname = result['data']['employee']['lastname']
                var contactno = result['data']['employee']['contactno']
                var deptname = result['data']['employee']['deptno']['deptname']
                var officeCity = result['data']['employee']['officeCity']['officeCity']
                var Details = "Name: " + firstName + " " + lastname + "\nContct no: " + contactno + "\nDepartment: " + deptname + "\nOffice: " + officeCity


                $("p").html("<textarea id='info' name='info' rows='5' cols='50'></textarea>");
                // $("#info").text(JSON.stringify(content));
                $("#info").text(Details);
                $('#cchange').show();
                $('#gpqldtl').hide();
            }

        });
    });
})