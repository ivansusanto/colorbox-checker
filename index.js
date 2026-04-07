const TELEGRAM_TOKEN = "8502127678:AAFPe7Suwbt8o3WhlTTO6BHjb-fYMqi7jgE";
const CHAT_ID = "6243384871";
const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

async function checkProduct(url, variants_index=0) {
    const cookieString = 
        "localization=ID; " +
        "_shopify_y=1ca9a065-83de-42c3-93ab-b009ed116d4a; " +
        "_shopify_analytics=:AZrFfbYRAAEATTVnROs27p_bFSI3Rtun6FSfwOWsILGMiHxjqgls7Z5G88Zil2_bvzW6APAWAs66uSiXlgicwEbX4dQQVbH1ITaGNYwd1MUbmqMNUHSaATyY8G-VHtKq6Ba2NeSTntyevMWCoIEhEOg_PLmgFScF9SnzR2MdyNGqkAnGyZ0jZLChrvC2lBZgRzAPv7MJJpBrtZ4arpfBot8Qe-FYK5JRxj2_yZlhXcg23_6_Ay69TFRD6DyxzIFgEmnCXQpw9nfQr5V7KsKwRMUXIbNAkrjb-1gNBMIqAOiOC_YIQUj4WdQrPL6vTqnmt9v8y5gymYSB9oetysdkbBDyaxg4yB2TtYqnYJynNTUrNym5Si0:; " +
        "_ga=GA1.1.1816688406.1764249944; " +
        "_gcl_gs=2.1.k1$i1764249942$u45228086; " +
        "_ttp=01KB2QVG1PPWWFY1695SFJPN96_.tt.0; " +
        "optiMonkClientId=593c3e53-e9f6-c6f1-4bda-22d43276f086; " +
        "optiMonkSession=1764249944; " +
        "_gcl_aw=GCL.1764249948.Cj0KCQiAiqDJBhCXARIsABk2kSnadHuPSVHdLZxDfyL8egV0SpKKNN_VcExGLo4kbt-GqsL7NNoCeW0aAurEEALw_wcB; " +
        "_gcl_au=1.1.1617653060.1764249944.118054419.1764249960.1764250181; " +
        "optiMonkClient=N4IgjGAcWSBcoDGBDewC+AaEAzAbvGAOwBsALAExkCc1ZZ2ANgXMeRQKwAMHkXAdB3rYAdgHsADiwrV06IA=; " +
        "optiMonkViewedProducts=[{\"productId\":\"9131510006018\",\"variantId\":\"46814992957698\"},{\"productId\":\"9131510038786\",\"variantId\":\"46814993121538\"},{\"productId\":\"9213813227778\",\"variantId\":\"47069878386946\"}]; " + // ^[ ^] ^" are replaced with [ ] "
        "ttcsid_CQ2DFGRC77U8HGT7M390=1764249944125::OZVTKOdRPwmdcfupJ6YR.1.1764250792318.0; " +
        "ttcsid=1764249944129::126_GP1FyadS4RqaCQ4O.1.1764250792362.0; " +
        "mp_afaf7826fa8313c8bcbd0fa22e8cd1e8_mixpanel=%7B%22distinct_id%22%3A%228795592917250%22%2C%22%24device_id%22%3A%22032b139f-7381-4232-84e2-364f9aecdd98%22%2C%22%24search_engine%22%3A%22google%22%2C%22%24initial_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%22www.google.com%22%2C%22__mps%22%3A%7B%7D%2C%22__mpso%22%3A%7B%7D%2C%22__mpus%22%3A%7B%7D%2C%22__mpa%22%3A%7B%7D%2C%22__mpu%22%3A%7B%7D%2C%22__mpr%22%3A%5B%5D%2C%22__mpap%22%3A%5B%5D%2C%22%24user_id%22%3A%228795592917250%22%7D; " + // ^%^7B etc. are kept as %7B (URL encoded)
        "keep_alive=eyJ2IjoyLCJ0cyI6MTc2NDI1MDc5MzUxNSwiZW52Ijp7IndkIjowLCJ1YSI6MSwiY3YiOjEsImJyIjoxfSwiYmh2Ijp7Im1hIjozMSwiY2EiOjMsImthIjoxNCwic2EiOjAsImtiYSI6MCwidGEiOjAsInQiOjQ5NCwibm0iOjEsIm1zIjowLjUsIm1qIjowLjI2LCJtc3AiOjAuMTUsInZjIjoxLCJjcCI6MC41NCwicmMiOjAuNzIsImtqIjowLjI4LCJraSI6MTY3LjE4LCJzcyI6MCwic2oiOjAsInNzbSI6MCwic3AiOjAsInRzIjowLCJ0aiI6MCwidHAiOjAsInRzbSI6MH0sInNlcyI6eyJwIjoxMSwicyI6MTc2NDI0OTk0MzMyNSwiZCI6ODI4fX0%3D; " + // ^%^3D is kept as %3D
        "_shopify_essential=:AZrFfbU-AAH_9wIck3xN0Caev_QScoDW1FktLDCYMLM4d9e_lgLqCbI9SYPNt3jKF1VYQm2aRG3oHC0-3axylGvv3xCbieoLSZAdMKk_Nw8dJqfry6I5BOCZt2-uK0HmQMgLYYjBgUL5eWTgHdozX3jf3rNOdk5ohuwRio38XaKNa5D0bbrEmhtqPQPkjaPu09PKQUZYbkEuYdiWfIGj0DcExBljRI855E6SHFrYSxVrrWkECBBgCKQoV_ayeKS7q2gxdvUEUPglDDHtQlHWrlGUhYePh7stJH66GYYXyoR-tmkP0gYgETRMPNnN2Q-kcMJ_rPwCQwZzd6t4ayhQlBdiLMrGGBMeSA1_xAe88bk058f2elaPIaGT-C1JLhfft84Na7hKspgryhkNFu7kHKMLKzF3x4t6HPohOO0N4mUdeyhJp4g2gGczDzbC6fhV3-E4QiynvBM-IQ1Pr3qoGIydzpY:; " +
        "_ga_TPGG9PK7J9=GS2.1.s1764249943$o1$g1$t1764250795$j56$l0$h0; " +
        "_ga_PK69D8K6DG=GS2.1.s1764249944$o1$g1$t1764250795$j56$l0$h0; " +
        "_shopify_s=5b35b5f2-eae0-47d3-92be-beb1809bc8d3";

    const fetchOptions = {
        method: 'GET',
        headers: {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8,ja;q=0.7",
            "cookie": cookieString,
            "if-none-match": "cacheable:502c862120dc03bff16b75031c57724c", 
            "priority": "u=1, i",
            "referer": "https://colorbox.co.id/products/short-pants-pajama-set-lilac-25h?_pos=1&_sid=a1ecffd5c&_ss=r",
            "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
        }
    };

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let resultMessage = "";

        const data = await response.json();
        resultMessage += `${data.title}: \n`;
        
        const variants = data.variants;
        variants.forEach(variant => {
            resultMessage += `- ${variant.title}, Available: ${variant.available ? "Yes" : "No"}\n`;
        });

        console.log(resultMessage);

        if (variants[variants_index].available){
            await sendTelegram(resultMessage);
        }
    } catch (error) {
        console.error("Fetch request failed:", error);
        await sendTelegram("Error checking product: " + error.message);
    }
}

async function sendTelegram(message) {
    await fetch(TELEGRAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message
        })
    });
}

checkProduct("https://colorbox.co.id/products/printed-tank-pajama-set-with-shorts-blush-25i.js", 3);
checkProduct("https://colorbox.co.id/products/printed-notch-collar-shorts-pajama-set-multicolor-25l.js", 3);

setInterval(() => checkProduct("https://colorbox.co.id/products/printed-tank-pajama-set-with-shorts-blush-25i.js", 1), 60 * 1000); // M
setInterval(() => checkProduct("https://colorbox.co.id/products/printed-notch-collar-shorts-pajama-set-multicolor-25l.js", 0), 60 * 1000); // S