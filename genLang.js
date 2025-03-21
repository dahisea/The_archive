const fs = require('fs');
const translate = require('@iamtraction/google-translate');

const configDir = "./config/_default";
const contentDir = "./content";
const defaultLang = "zh-tw";
const targetLang = process.argv[2] || "ja";
const targetLangIso = targetLang === "zh" ? "zh-cn" : targetLang;

// Fields in front matter that should be translated
const translatableFields = ["title", "description", "summary", "categories", "tags"];

// Create translated config files
function createConfigs() {
    const files = fs.readdirSync(configDir);
    files.forEach(file => {
        const filePath = `${configDir}/${file}`;
        if (filePath.includes("languages.ja.toml") || filePath.includes("menus.ja.toml")) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const newFilePath = filePath.replace(".ja.toml", `.${targetLangIso}.toml`);
            fs.writeFileSync(newFilePath, fileContent, 'utf8');
        }
    });
}

// Translate text using Google Translate
async function convert(text, from, to) {
    try {
        const res = await translate(text, { from, to });
        return res.text;
    } catch (err) {
        console.error("Translation error:", err);
        return text; // Return original text if translation fails
    }
}

// Process front matter block
async function processFrontMatter(block) {
    const lines = block.split("\n");
    let translatedBlock = "";

    for (const line of lines) {
        if (line.includes(":")) {
            const [key, ...valueParts] = line.split(":");
            const value = valueParts.join(":").trim();

            if (translatableFields.includes(key.trim())) {
                // Extract text inside quotes or brackets
                const match = value.match(/^(["'【「])(.*)(["'】」])$/);
                if (match) {
                    const [_, openingChar, content, closingChar] = match;
                    const translatedContent = await convert(content, defaultLang, targetLang);
                    translatedBlock += `${key}: ${openingChar}${translatedContent}${closingChar}\n`;
                } else {
                    // If no special characters, translate the entire value
                    const translatedValue = await convert(value, defaultLang, targetLang);
                    translatedBlock += `${key}: ${translatedValue}\n`;
                }
            } else {
                translatedBlock += `${line}\n`;
            }
        } else {
            translatedBlock += `${line}\n`;
        }
    }

    return translatedBlock.trim(); // Remove trailing newline
}

// Process Markdown content, preserving code blocks and URLs
async function processContent(content) {
    const lines = content.split("\n");
    let translatedContent = "";

    for (const line of lines) {
        // Skip translation for code blocks and URLs
        if (line.startsWith("```") || line.startsWith("http")) {
            translatedContent += `${line}\n`;
        } else {
            const translatedLine = await convert(line, defaultLang, targetLang);
            translatedContent += `${translatedLine}\n`;
        }
    }

    return translatedContent.trim();
}

// Process a single file
async function processFile(filePath) {
    if (!filePath.endsWith("index.md")) return;

    console.log("Translating:", filePath);

    const targetFilePath = filePath.replace(".md", `.${targetLangIso}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const parts = fileContent.split("---\n");
    if (parts.length < 3) return; // Skip files without valid front matter

    const frontMatter = parts[1];
    const content = parts.slice(2).join("---\n");

    const translatedFrontMatter = await processFrontMatter(frontMatter);
    const translatedContent = await processContent(content);

    const newFileContent = `---\n${translatedFrontMatter}\n---\n${translatedContent}`;
    fs.writeFileSync(targetFilePath, newFileContent, 'utf8');
}

// Recursively process a folder
async function processFolder(folderPath) {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = `${folderPath}/${file}`;
        const isDir = fs.lstatSync(filePath).isDirectory();

        if (isDir) {
            await processFolder(filePath);
        } else {
            await processFile(filePath);
        }
    }
}

// Main function to create translated content
async function createContent() {
    await processFolder(contentDir);
}

// Run the script
createConfigs();
createContent();