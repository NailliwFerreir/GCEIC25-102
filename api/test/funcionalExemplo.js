// npm install selenium-webdriver
// npm install --save-dev start-server-and-test
//"e2e-test": "start-server-and-test http://localhost:3000/ht test2"

const { Builder, Browser, By,Key,  until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Options } = require('selenium-webdriver/chrome');

const { Builder } = require('selenium-webdriver');
const { FlutterSeleniumBridge } = require('@rentready/flutter-selenium-bridge');



(async () => {

   // Configuração do ambiente do WebDriver e opções do navegador
   const screen = {
    width: 1024,
    height: 720
  };

  const chromeOptions = new Options();
  chromeOptions.addArguments('--headless');
  chromeOptions.addArguments('--no-sandbox');
  chromeOptions.windowSize(screen);

  const builder = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions);

    // Criação da instância do WebDriver
  let driver = await builder.build();

  try {
    
    // Navegação para a página HTML
//    await driver.get('https://www.sergio.dev.br');

    await driver.get(' https://sergi3607.c35.integrator.host/');

    // Wait for 5 secs to let the dynamic content to load
    await driver.sleep(5000);
    

    const button = await driver.findElement(By.css('[aria-label="Entrar"]'));
    
    await button.click();
    /*
    driver.findElement(By.XPATH, "//div[@aria-label='Abrir Consulta 2']").click();
    // Esperar o site carregar completamente
    await driver.sleep(15000);
*/

    // await driver.wait(until.elementLocated(By.id('valorBase')), 10000);
  //  await driver.wait(until.elementIsVisible(driver.findElement(By.id('valorBase'))), 10000);
  //  await driver.wait(until.elementLocated(By.id('valorAltura')), 10000);
  //  await driver.wait(until.elementIsVisible(driver.findElement(By.id('valorAltura'))), 10000);

/*
driver.takeScreenshot().then(function(data){
  var base64Data = data.replace(/^data:image\/png;base64,/,"")
   fs.writeFile("out.png", base64Data, 'base64', function(err) {
        if(err) console.log(err);
   });
*/ 

    // diretorio deve existir...
    await driver.takeScreenshot().then((image, err) => {
        require('fs').writeFile('./fotos/exemplo/inicio-example_102.png', image, 'base64', function (err) {
          if (err == null){
              console.log('Gravou Foto');
          }else{
              console.log('Erro ->' + err);
          }
  
        });
      });
  
  //  await driver.findElement(By.name('valorBase')).sendKeys(4, Key.RETURN);
  //  await driver.findElement(By.name('valorAltura')).sendKeys(4, Key.RETURN);
/*
   // Captura de tela final
    await driver.takeScreenshot().then((image, err) => {
      require('fs').writeFile('./fotos/exemplo/valorDigitado-example.png', image, 'base64', function (err) {
        if (err == null){
            console.log('Gravou Foto');
        }else{
            console.log('Erro ->' + err);
        }
      });
    });
    
    
    // Verificação dos botões 
    const calculaButton = await driver.findElement(By.name('calcula'));
    // Verifica se os botões estão visíveis
    if ( (await calculaButton.isDisplayed()) ) {
      console.log('Passou: Botões de impostos estão visíveis');
    } else {
      console.log('Falhou: Botões de impostos não estão visíveis');
    }

   // valorAltura = await driver.findElement(By.id('valorAltura'));
   // await valorAltura.sendKeys('10');

   // valorBase = await driver.findElement(By.id('valorBase'));
   // await valorBase.sendKeys('4');

    // Clique no botão 
    await calculaButton.click();

    // Captura de tela final
    await driver.takeScreenshot().then((image, err) => {
      require('fs').writeFile('./fotos/exemplo/fim-example.png', image, 'base64', function (err) {
        if (err == null){
            console.log('Gravou Foto');
        }else{
            console.log('Erro ->' + err);
        }

      });
    });
    // Encerramento do WebDriver
  */  
  } catch (error) {
    console.error('Teste funcional falhou:', error);
  } finally {
    await driver.quit();
  }

})();