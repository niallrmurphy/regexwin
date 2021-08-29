async function find(query) {
  // If you don't exclude the current tab, a URL search might find the
  // current page.
  let this_tab_url = browser.runtime.getURL("regexwin.html");
  let tabs = await browser.tabs.query({});
  let re = new RegExp(query);
  let results = new Array();

  for (let tab of tabs) {
    // Iterate through the tabs, but exclude the current tab.
    if (tab.url === this_tab_url) {
      continue;
    }

    if (re.test(tab.url)) {
      results.push(tab);
      console.log(tab);
    }
  }

  browser.runtime.sendMessage({
    msg: "found-results",
    count: results.length
  });

}

function onCreated(windowInfo) {
  console.log(`Created window: ${windowInfo.id}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

async function move(query) {
  let this_tab_url = browser.runtime.getURL("regexwin.html");
  let tabs = await browser.tabs.query({});
  let re = new RegExp(query);
  let results = new Array();

  for (let tab of tabs) {
    // Iterate through the tabs, but exclude the current tab.
    if (tab.url === this_tab_url) {
      continue;
    }

    if (re.test(tab.url)) {
      results.push(tab);
    }
  }

  _DEBUG = 0

  if (results.length > 0) {
    first_id = results[0].id;
    createData = { tabId: first_id }
    results.shift();

    let created = await browser.windows.create(createData);

    onlyIds = new Array();
    for (let tabsep in results) {
      onlyIds.push(results[tabsep].id);
    }

    var TabIds = results.map(tabInfo => tabInfo.id);

    if (_DEBUG == 0) {
      var moving = await browser.tabs.move(TabIds,
        {windowId: created.id, index: 0});
    }
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({"url": "/regexwin.html"});
});
