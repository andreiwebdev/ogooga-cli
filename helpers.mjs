import chalk from "chalk";
import fs from "fs";
import path from "path";

// Helper function to create a template
export function createTemplate(type, name, phpContent, twigContent) {
  const phpTemplatePath = path.join(process.cwd(), `/${type}/${name}.php`);
  const twigTemplatePath = path.join(
    process.cwd(),
    `/templates/${type}/${name}.twig`
  );

  if (!fs.existsSync(phpTemplatePath) && !fs.existsSync(twigTemplatePath)) {
    fs.writeFileSync(phpTemplatePath, phpContent);
    fs.writeFileSync(twigTemplatePath, twigContent);
    console.log(chalk.green(`Template created ✅`));
  } else {
    console.log(chalk.red(`Template already exists 😔`));
  }
}
