import AutoLinkTitle from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface AutoLinkTitleSettings {
  regex: RegExp;
  lineRegex: RegExp;
  linkRegex: RegExp;
  linkLineRegex: RegExp;
  imageRegex: RegExp;
  githubUrlRegex: RegExp;
  githubRepoRegex: RegExp;
  githubIssuePrRegex: RegExp;
  shouldReplaceSelection: boolean;
  enhanceDefaultPaste: boolean;
  useGitHubShortlinks: boolean;
}

export const DEFAULT_SETTINGS: AutoLinkTitleSettings = {
  regex:
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i,
  lineRegex:
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  linkRegex:
    /^\[([^\[\]]*)\]\((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\)$/i,
  linkLineRegex:
    /\[([^\[\]]*)\]\((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})\)/gi,
  imageRegex: /\.(gif|jpe?g|tiff?|png|webp|bmp|tga|psd|ai)$/i,

  githubUrlRegex: /github\.com/i,
  githubRepoRegex: /github\.com\/([^\/]+)\/([^\/]+)\b(?!\/)/i,
  githubIssuePrRegex: /github\.com\/([^\/]+)\/([^\/]+)\/(issues|pull)\/(\d+)#?/i,

  shouldReplaceSelection: true,
  enhanceDefaultPaste: true,
  useGitHubShortlinks: false,
};

export class AutoLinkTitleSettingTab extends PluginSettingTab {
  plugin: AutoLinkTitle;

  constructor(app: App, plugin: AutoLinkTitle) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Enhance Default Paste")
      .setDesc(
        "Fetch the link title when pasting a link in the editor with the default paste command"
      )
      .addToggle((val) =>
        val
          .setValue(this.plugin.settings.enhanceDefaultPaste)
          .onChange(async (value) => {
            console.log(value);
            this.plugin.settings.enhanceDefaultPaste = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Use GitHub shortlinks instead of title")
      .setDesc(
        "Use GitHub shortlinks of the form :user/:repo#123 instead of the title of the link when pasting a link in the editor"
      )
      .addToggle((val) =>
        val
          .setValue(this.plugin.settings.useGitHubShortlinks)
          .onChange(async (value) => {
            console.log(value);
            this.plugin.settings.useGitHubShortlinks = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Replace Selection")
      .setDesc(
        "Whether to replace a text selection with link and fetched title"
      )
      .addToggle((val) =>
        val
          .setValue(this.plugin.settings.shouldReplaceSelection)
          .onChange(async (value) => {
            console.log(value);
            this.plugin.settings.shouldReplaceSelection = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
