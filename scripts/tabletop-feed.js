var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(Password){
    var password = prompt("Please enter the password.", "");
    if (password != null) {
        initializeTabletopObject("https://docs.google.com/spreadsheets/d/1O-Ph" + password + "sbWNy77TeUQE7hIgfQ1eLDfj2I6F2FFRDlg/pubhtml");
    }
});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){

    /* swap out the properties of mDataProp & sTitle to reflect
    the names of columns or keys you want to display.
    Remember, tabletop.js strips out spaces from column titles, which
    is what happens with the More Info column header */

    var tableColumns =   [
		{"mDataProp": "name", "sTitle": "Name of Source", "sClass": "center"},
		{"mDataProp": "jobtitleorposition", "sTitle": "Title or Position", "sClass": "center"},
		{"mDataProp": "organizationorcampusdepartment", "sTitle": "Organization", "sClass": "center"},
		{"mDataProp": "workphonenumber", "sTitle": "Work Phone", "sClass": "center"},
		{"mDataProp": "cellphonenumber", "sTitle": "Cell Phone", "sClass": "center"},
		{"mDataProp": "otherphonenumber", "sTitle": "Other Phone", "sClass": "center"},
		{"mDataProp": "workemailaddress", "sTitle": "Work Email", "sClass": "center"},
		{"mDataProp": "personalemailaddress", "sTitle": "Personal Email", "sClass": "center"},
		{"mDataProp": "notesandadditionalinformationtoknowaboutthesource", "sTitle": "Notes", "sClass": "left"}
	];
    return tableColumns;
}

// create the table container and object
function writeTableWith(dataSource){

    jqueryNoConflict("#demo").html("<table cellpadding='0' cellspacing='0' border='0' class='display table table-bordered table-striped' id='data-table-container'></table>");

    var oTable = jqueryNoConflict("#data-table-container").dataTable({
        "sPaginationType": "bootstrap",
        "iDisplayLength": 10,
        "aaData": dataSource,
        "aoColumns": createTableColumns(),
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            console.log(aData);
            $("td:eq(3)", nRow).html("<a href='tel:" + aData.workphonenumber + "'>" + aData.workphonenumber + "</a> " + aData.notesaboutusingtheirworkphonenumber);
            $("td:eq(4)", nRow).html("<a href='tel:" + aData.cellphonenumber + "'>" + aData.cellphonenumber + "</a> " + aData.notesaboutusingtheircellphonenumber);
            $("td:eq(5)", nRow).html("<a href='tel:" + aData.otherphonenumber + "'>" + aData.otherphonenumber + "</a> " + aData.notesaboutusingtheirotherphonenumber);
            $("td:eq(6)", nRow).html("<a href='mailto:" + aData.workemailaddress + "'>" + aData.workemailaddress + "</a> " + aData.notesaboutusingtheirworkemailaddress);
            $("td:eq(7)", nRow).html("<a href='mailto:" + aData.personalemailaddress + "'>" + aData.personalemailaddress + "</a> " + aData.notesaboutusingtheirpersonalemailaddress);
            return nRow;
        },
        "oLanguage": {
            "sLengthMenu": "_MENU_ sources per page"
        }
    });

};

//define two custom functions (asc and desc) for string sorting
jQuery.fn.dataTableExt.oSort["string-case-asc"]  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort["string-case-desc"] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};
