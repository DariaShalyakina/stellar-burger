// тесты для страницы конструктора бургера
describe('тестируем конструктор', () => {
  const testURL = 'http://localhost:4000';
  beforeEach(() => {
    cy.visit(testURL);
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'checkAuth'
    );
    cy.setCookie('accessToken', 'testToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  describe('добавление ингредиентов в конструктор', () => {
    it('должен добавлять ингредиенты в конструктор', () => {
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]').click({ force: true });
      cy.get('[data-cy="Соус традиционный галактический"]').click({
        force: true
      });
      cy.get('[data-cy="Мясо бессмертных моллюсков Protostomia"]').click({
        force: true
      });
    });
  });

  // тесты работы модальных окон:
  describe('работа модальных окон', () => {
    it('должно открывать модальное окно ингредиента', () => {
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]').click();
      cy.get('[data-cy="modal"]').should('contain.text', 'Детали ингредиента');
    });

    it('отображение деталей ингредиента в модальном окне', () => {
      cy.get('[data-cy="Говяжий метеорит (отбивная)"]').click();
      cy.get('[data-cy="modal"]').should(
        'contain.text',
        'Говяжий метеорит (отбивная)'
      );
      cy.get('[data-cy="modal"]').should('contain.text', 'Калории, ккал');
      cy.get('[data-cy="modal"]').should('contain.text', '2674');
    });

    it('закрытие модального окна по клику на крестик', () => {
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="buttonOnClose"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('закрытие модального окна клику на оверлей', () => {
      cy.get('[data-cy="Флюоресцентная булка R2-D3"]').click();
      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  //тесты на создание заказа
  it('Проверяем создание заказа', () => {
    cy.get('[data-cy="Флюоресцентная булка R2-D3"]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="Мясо бессмертных моллюсков Protostomia"]')
      .contains('Добавить')
      .click();
    cy.get('[data-cy="Соус традиционный галактический"]')
      .contains('Добавить')
      .click();
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    // Используем data-cy для проверки номера заказа
    cy.get('[data-cy="orderNumber"]').then(($orderNumber) => {
      const orderNumber = $orderNumber.text();
      expect(orderNumber).to.match(/\d+/); // Проверяем, что номер заказа - это число
    });

    cy.get('[data-cy="buttonOnClose"]').click();
    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
