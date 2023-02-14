import { formatISO8601WithTime, randomEightDigitNumber } from '../support/utils';

describe('新規予約', () => {
  context('新規会員登録から予約完了', () => {
    const now = formatISO8601WithTime(new Date())
    const email = `teste2e-${now}@test.com`;
    const another_email = `teste2e-${now + "another"}@test.com`;
    const tel = "03" + randomEightDigitNumber()
    const password = "poppie1234"

    before(() => {
      cy.logout();
    });

    it('トップから新規登録画面へ遷移することができる', () => {
      cy.visit('/');
      cy.get('[data-cy=registrationInHeader]').click();
      cy.contains('ご希望のプランを選択してください').should('exist');
    });

    it('新規登録することができる', () => {
      cy.visit('/companies/new/input');
      cy.get('[data-cy=freePlan]').click();
      // 会社名
      cy.get('[data-cy=companyName]').type("テストe2e株式会社");
      // メールアドレス
      cy.get('[data-cy=email]').type(email);
      // 電話番号
      cy.get('[data-cy=tel]').type(tel);
      // 登録ボタンクリック
      cy.get('button').contains(new RegExp('^登録する$')).click();
      cy.contains('テストe2e株式会社').should('exist');
    });


    it('他ユーザーにポイントをあげることができる', () => {
      // ログイン
      cy.visit('/login');
      // メールアドレス
      cy.get('[data-cy=email]').type(email);
      // パスワード
      cy.get('[data-cy=password]').type(password);
      //ログインボタンをクリック
      cy.get('[data-cy=loginButton]').click();

      // ユーザー一覧画面
      cy.visit('/settings/users');
      // ユーザー追加ボタンクリック
      cy.get('[data-cy=addUserButton]').click();
      // 名前
      cy.get('[data-cy=name]').type('テスト2e2追加ユーザー');
      // メールアドレス
      cy.get('[data-cy=email]').type(another_email);
      // パスワード
      cy.get('[data-cy=password]').type(password);
      // ユーザー追加ボタンをクリック
      cy.get('[data-cy=registerButton]').click();

      // ポイントをあげる画面
      cy.visit('/dealings/new/input');
      cy.contains('ポイントを贈るユーザー').should('exist');
      cy.get('[data-cy=userName]').select('テスト2e2追加ユーザー')
      cy.get('[data-cy=givePoint]').type("100");
      cy.get('[data-cy=comment]').type("e2eテストコメント");
      cy.get('[data-cy=confirmButton]').click();
      // 確認画面
      cy.get('[data-cy=givePointButton]').click();
      // マイページトップが表示されていること
      cy.url().should('include', '/mypage')
    });
  });
});
