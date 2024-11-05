#!/usr/bin/env node
import { Command } from "commander";
import { createTemplate } from "./helpers.mjs";
import { phpBlockTemplate, phpPageTemplate, twigPageTemplate } from "./templates.mjs";

const program = new Command();

program
  .name("og")
  .description("A custom CLI for automating my workflow")
  .version("1.0.0");

program
  .command("template")
  .description("Command for creating a page template")
  .argument("<TemplateName>", "Template name")
  .action((templateName) => {
    const phpContent = phpPageTemplate(templateName);
    const twigContent = twigPageTemplate();
    createTemplate("pages", templateName.toLowerCase(), phpContent, twigContent);
  });

program
  .command("block")
  .description("Command for creating a block template")
  .argument("<BlockName>", "Block name")
  .argument("[FunctionName]", "Function Name")
  .action((blockName, functionName) => {
    const phpContent = phpBlockTemplate(blockName, functionName);
    createTemplate("blocks", blockName.toLowerCase(), phpContent, "");
  });

program.parse(process.argv);
