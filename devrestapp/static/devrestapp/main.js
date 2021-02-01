/*
Notes from Janki Thakkar
def get_serializer_class(self):
    if self.request.version == 'v1':
        return AccountSerializerVersion1
    return AccountSerializer

    @GetMapping("/quizzesByCustomHeader")
public List<Quiz> getAllQuizzes(@RequestHeader("x-api-version") String version) {
  // logic here to check the passed in version string and based on
  // that process the request differently
  ...
}

x-api-version=v1
*/
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
                $('#cchange').show();
                $("form").hide();
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
                $("#gpqldtl").hide();
                $("form").hide()
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
            headers: { 'x-version-number': '1.2' },
            data: JSON.stringify({
                query : `{
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
                result['data']['allEmployee'].forEach(elem => names += "<option value=" + elem['id'] + ">"+ elem['firstname'] +"</option>" )
                //console.log(names)
                $("p").html( names + "</select>");
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
                var Details = "Name: " + firstName + " " + lastname  +"\nContct no: "+ contactno + "\nDepartment: " + deptname  + "\nOffice: "+ officeCity

                
                $("p").html("<textarea id='info' name='info' rows='5' cols='50'></textarea>");
               // $("#info").text(JSON.stringify(content));
               $("#info").text(Details);
                $('#cchange').show();
                $('#gpqldtl').hide();
            }

        });
    });
    
})