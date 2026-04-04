// ============================================
// GOOGLE APPS SCRIPT — Provisions Contact Form
// ============================================
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Create a new project, name it "Provisions Contact Form"
// 3. Paste this entire script into Code.gs
// 4. Click Deploy → New deployment
// 5. Type: Web app
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Click Deploy and copy the URL
// 9. Paste the URL into index.html where it says PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE
//
// That's it. Form submissions will email you and log to a Google Sheet.
// ============================================

var EMAIL = 'sam@provisions.work';
var SHEET_NAME = 'Form Submissions';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Send email
    MailApp.sendEmail({
      to: EMAIL,
      subject: 'New inquiry from provisions.work — ' + data.type,
      htmlBody:
        '<h2>New inquiry from provisions.work</h2>' +
        '<p><strong>Name:</strong> ' + data.name + '</p>' +
        '<p><strong>Email:</strong> ' + data.email + '</p>' +
        '<p><strong>Company:</strong> ' + (data.company || 'N/A') + '</p>' +
        '<p><strong>Looking for:</strong> ' + data.type + '</p>' +
        '<p><strong>Message:</strong></p>' +
        '<p>' + data.message + '</p>' +
        '<hr>' +
        '<p style="color: #999; font-size: 12px;">Sent from provisions.work contact form</p>',
      replyTo: data.email
    });

    // Log to spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      ss = SpreadsheetApp.create('Provisions — Form Submissions');
    }
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Type', 'Message']);
    }
    sheet.appendRow([
      new Date().toISOString(),
      data.name,
      data.email,
      data.company || '',
      data.type,
      data.message
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Provisions contact form endpoint is active.');
}
