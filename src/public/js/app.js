$(document).ready(() =>{
  
    $('#buscar').keydown( () =>{

     let input  =  document.getElementById('buscar').value;
     let search =  input.toUpperCase();
     let table  =  document.getElementById('table');
     let tr     =  table.getElementsByTagName('tr');
     let td, textValue;

      for(let i = 0; i < tr.length; i++ ){
          td = tr[i].getElementsByTagName('td')[0];
          if(td){
              textValue  = td.textContent || td.innerText;

              if(textValue.toUpperCase().indexOf(search) > -1){
                  tr[i].style.display = "";
              }else{
                  tr[i].style.display = 'none';
              }
          }
      }
    });
});