import { Page, expect } from '@playwright/test';
import { contatoElements } from '../elements/glitz.elements';

export class ContatoPage {
  constructor(private page: Page) {}

  async acessarHome() {
    await this.page.goto('https://www.glitzmerch.com.br/');
  }

  async aceitarCookies() {
    const botaoCookies = this.page.getByRole('button', {
      name: contatoElements.cookies.botaoAceitar
    });

    if (await botaoCookies.isVisible()) {
      await botaoCookies.click();
    }
  }

  async acessarContato() {
    await this.page.goto('https://www.glitzmerch.com.br/contato');
  }

  async preencherFormulario(
    nome: string,
    email: string,
    telefone: string,
    mensagem: string
  ) {
    await this.page
      .getByLabel(contatoElements.contato.inputNome)
      .fill(nome);

    await this.page
      .getByLabel(contatoElements.contato.inputEmail)
      .fill(email);

    await this.page
      .getByLabel(contatoElements.contato.inputTelefone)
      .fill(telefone);

    await this.page
      .getByLabel(contatoElements.contato.inputMensagem)
      .fill(mensagem);
  }

  async clicarEnviar() {
    await this.page
      .getByRole('button', {
        name: contatoElements.contato.botaoEnviar
      })
      .click();
  }

  async validarMensagemSucesso() {
    await expect(
      this.page.getByText(
        contatoElements.contato.mensagemSucesso
      )
    ).toBeVisible();
  }

  async validarCamposContatoVisiveis() {
    await expect(
      this.page.getByLabel(contatoElements.contato.inputNome)
    ).toBeVisible();

    await expect(
      this.page.getByLabel(contatoElements.contato.inputEmail)
    ).toBeVisible();

    await expect(
      this.page.getByLabel(contatoElements.contato.inputMensagem)
    ).toBeVisible();
  }

  async validarPermanenciaPaginaContato() {
    await expect(this.page).toHaveURL(/contato/i);
  }
}