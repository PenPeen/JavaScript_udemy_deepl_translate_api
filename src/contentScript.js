const elm = document.body;
const config = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true,
};

let caption;
let nowString;
const observer = new MutationObserver(function () {
  caption =
    $("div[class^='well--container--']").length == 1
      ? $("div[class^='well--container--']").text()
      : $("div[class^='captions-display--captions-container']").text();
  if (caption !== "" && nowString !== caption) {
    console.log("go transration");
    nowString = caption;
    observer.disconnect();
    $.post("https://api-free.deepl.com/v2/translate", {
      /**
       * ここにDeeplから設定したAPIキーを設定
       */
      auth_key: "",
      text: nowString,
      target_lang: "JA",
    })
      .done(function (data) {
        $(".captions-display--captions-cue-text--ECkJu").text(
          data.translations[0].text
        );
      })
      .always(function () {
        observer.observe(elm, config);
      });
  }
});

observer.observe(elm, config);
