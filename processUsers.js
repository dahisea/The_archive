const fs = require('fs');
const axios = require('axios');
const path = require('path');

const configDir = "./config/_default";
const defaultLang = "ja";
const usersFolderPath = "./content/tomodachi/";
const translate = require('@iamtraction/google-translate');

var targetLangs = [];

const configFiles = fs.readdirSync(configDir);
configFiles.forEach(file => {
    if (file.indexOf("languages.") > -1) {
        var lang = file.split(".")[1];
        if (lang != defaultLang) {
            targetLangs.push(lang);
        }
    }
});

const indexFiles = fs.readdirSync(usersFolderPath);
for (var i in targetLangs) {
    var targetFile = '_index.' + targetLangs[i] + '.md';
    if (indexFiles.indexOf(targetFile) == -1) {
        fs.copyFileSync(usersFolderPath + '_index.md', usersFolderPath + targetFile);
    }
}

let rawdata = fs.readFileSync(usersFolderPath + 'users.json');
let users = JSON.parse(rawdata);
let userDict = {};
for (var i in users) {
    userDict[users[i].title.replaceAll("/", "-")] = true;
}

const files = fs.readdirSync(usersFolderPath);

for (file in files) {
    let stats = fs.statSync(usersFolderPath + files[file]);
    if (files[file] != 'users.json' && files[file].indexOf("_index.") == -1) {
        if (stats.isDirectory()) {
            if (!userDict[files[file].replaceAll("/", "-")]) {
                console.log('deleting: ', files[file]);
                fs.rmdirSync(usersFolderPath + files[file], { recursive: true, force: true });
            }
        } else {
            console.log('deleting: ', files[file]);
            fs.unlinkSync(usersFolderPath + files[file]);
        }
    }
}

var cache = {};

async function convert(text, from, to) {
    var options = {
        from: from,
        to: to
    };
    if (!cache[to])
        cache[to] = {};
    if (cache[to][text])
        return cache[to][text];
    var translated_text = await translate(text, options);
    cache[to][text] = translated_text.text;
    return translated_text.text;
}

async function translateFrontMatterTags(block, targetLang, tags) {
    var array = block.split("\n");
    var translatedBlock = "";
    for (var i = 0; i < array.length; i++) {
        if (array[i].indexOf(":") > -1) {
            var elements = array[i].split(":");
            var newElement = "";
            if (elements[0].indexOf("tags") != -1) {
                translatedTags = [];
                for (var j in tags) {
                    var tempTag = await convert(tags[j], defaultLang, targetLang);
                    translatedTags.push(tempTag);
                }
                var trasnlatedTagsString = translatedTags.join(", ");
                newElement = elements[0] + ": [" + trasnlatedTagsString + "]";
            } else {
                newElement = array[i];
            }
        } else {
            newElement = array[i];
        }
        translatedBlock += newElement + "\n";
    }
    return translatedBlock;
}

async function downloadImage(url, dest) {
    const writer = fs.createWriteStream(dest);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function processUsers() {
    for (var i in users) {
        var userMDFile = "---\n\
            title: \""+ users[i].title + "\"\n\
            tags: ["+ users[i].tags + "]\n\
            externalUrl: \""+ users[i].url + "\"\n\
            weight: "+ (i+1) +"\n\
            showDate: false\n\
            showAuthor: false\n\
            showReadingTime: false\n\
            showEdit: false\n\
            showLikes: false\n\
            showViews: false\n\
            layoutBackgroundHeaderSpace: false\n\
            \r---\n";

        var dir = path.join(usersFolderPath, users[i].title.replaceAll("/", "-"));

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log(i, users[i].title);
            fs.writeFileSync(path.join(dir, 'index.md'), userMDFile);
            for (var j in targetLangs) {
                var content = await translateFrontMatterTags(userMDFile, targetLangs[j], users[i].tags);
                fs.writeFileSync(path.join(dir, 'index.' + targetLangs[j] + '.md'), content);
            }
            // Download and save the image
            await downloadImage(users[i].sourse, path.join(dir, 'feature.png'));
        }
    }
}

processUsers().catch(console.error);
