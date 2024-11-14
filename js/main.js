const modalEditCustomer = new bootstrap.Modal(
    document.getElementById("modalEditCustomer"),
    {keyboard:false}
);
const url = "http://localhost/caro_macias/";

const application = new function(){
    const mxn = new Intl.NumberFormat('en-US',{
        style : 'currency',
        currency : 'USD'
    });
    //References
    this.fullname = document.getElementById("fullname");
    this.phone_number = document.getElementById("phone_number");
    this.customers = document.getElementById("customers");
    this.editId = document.getElementById("edit_id")
    this.editFullname = document.getElementById("edit_fullname");
    this.editPhoneNumber = document.getElementById("edit_phone_number")
    this.Read = function(){
        var data = "";
        fetch(url).then(r => r.json()).then((response) => {
            console.log(response);
            response.map(function(customer, _, _){
                data += "<tr>";
                    data += "<td><a href='/transaction.html'>" + customer.FULLNAME +"</a></td>";
                    data += "<td>" + customer.LAST_TRANSACTION + "</td>";
                    data += "<td>" + mxn.format(customer.BALANCE) + "</td>";
                    data += "<td>";
                        data += "<button class='btn btn-info' onclick='application.Edit(" + customer.ID + ")' role='button'>Editar</button>"
                    data += "</td>"
                data += "</tr>";
            })
            return this.customers.innerHTML = data;
        }).catch(console.log);
    }
    this.Add = function(){
        console.log(fullname.value);
        console.log(phone_number.value);
        var sendData = {
            fullname : this.fullname.value,
            phone_number : this.phone_number.value
        }
        fetch(url + "?add=1",{method:"POST", body:JSON.stringify(sendData)}).then(r => r.json()).then((response) => {
            console.log("Datos insertados");
            this.Read();
            this.clearNewCustomerForm();
        }).catch(console.log);
    }
    this.Edit = function(id){
        fetch(url+"?read="+id).then(r => r.json()).then((response) => {
            console.log(response);
            this.editId.value = response.ID
            this.editFullname.value = response.FULLNAME
            this.editPhoneNumber.value = response.PHONE
        }).catch(console.log);
        modalEditCustomer.show();
    }
    this.Update = function(){
        var sendData = {
            id : this.editId.value,
            fullname : this.editFullname.value,
            phone_number : this.editPhoneNumber.value
        }
        console.log("fullname: " + this.editFullname.value)
        console.log("body:JSON.stringify(sendData): " + JSON.stringify(sendData))
        fetch(url + "?update=1",{method:"POST", body:JSON.stringify(sendData)}).then(r => r.json()).then((response) => {
            console.log("Datos actualizados");
            this.Read();
            this.clearEditModal();
            modalEditCustomer.hide();
        }).catch(console.log);
    }
    this.clearNewCustomerForm = function(){
        this.fullname.value = "";
        this.phone_number.value = "";
    }
    this.clearEditModal = function(){
        this.editId.value = "";
        this.editFullname.value = "";
        this.editPhoneNumber.value = "";
    }

}
application.Read()