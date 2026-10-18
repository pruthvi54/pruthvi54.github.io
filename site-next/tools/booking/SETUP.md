# Booking from Google Calendar — one-time setup (about 10 minutes)

The website's "Book a call" window reads your free hours from Google Calendar and sends requests back to it,
through a small Google Apps Script that runs in your own Google account (`Code.gs` in this folder).

## 1. Create the "Bookable hours" calendar
1. Open calendar.google.com on a computer.
2. Left side, next to **Other calendars**, click **+** → **Create new calendar**.
3. Name: **Bookable hours** (exactly this) → **Create calendar**.

## 2. Mark your free hours
Create events in **Bookable hours** for the times people may book, for example
"Free" every Monday 11:00–22:30 (set **Repeat → Weekly**). Choose **Bookable hours** as the calendar in the event
dialog. Any length works; the website cuts them into 30-minute slots.

Your normal calendar still matters: anything there shown as **Busy** removes the overlapping slots.

## 3. Add the script
1. Go to **script.google.com** → **New project**. Rename it (top left) to **Website booking**.
2. Open **Code.gs**, delete what is there, and paste the whole contents of `tools/booking/Code.gs`.
3. Click the gear (**Project Settings**) → tick **Show "appsscript.json" manifest file in editor**.
4. Back in the editor, open **appsscript.json** and replace its contents with `tools/booking/appsscript.json`.
5. Click **Save**.

## 4. Give it permission (once)
1. In the function menu at the top, choose **authorize**, then click **Run**.
2. **Review permissions** → choose your account. Google shows "Google hasn't verified this app" because it is your
   own private script: click **Advanced** → **Go to Website booking (unsafe)** → **Allow**.
3. The log at the bottom should say **Setup OK. N bookable slots …**. If it says the calendar was not found, check
   the name in step 1.

## 5. Publish it as a web app
1. **Deploy** → **New deployment** → gear next to "Select type" → **Web app**.
2. **Execute as: Me** · **Who has access: Anyone** → **Deploy**.
3. Copy the **Web app URL** (ends in `/exec`) and send it to Claude (or put it in
   `src/data/content.json` → `profile.booking.endpoint`).

## Day to day
- **Change your free hours:** edit or drag events in **Bookable hours**.
- **Block a time:** add any event to your normal calendar.
- **A request arrives:** a **Pending: name** event holds the slot and you get an email with **Accept** / **Decline**.
  Accept sends the guest a Google Calendar invitation with a Google Meet link; Decline frees the slot and tells them.

## If you change the script later
**Deploy → Manage deployments → pencil → Version: New version → Deploy.** The URL stays the same.
