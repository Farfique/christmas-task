class Settings {
  private static instance: Settings;
  readonly maxFavoritesNumber: number;

  private constructor(){
    this.maxFavoritesNumber = 20;
  }

  public static getInstance(): Settings {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }
    return Settings.instance;
}

}

const instance = Settings.getInstance();
export default instance;