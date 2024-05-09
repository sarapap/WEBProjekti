

  test('handles error when the API call fails', async () => {
    // Mock the fetch to return an error response
    fetch.mockReject(new Error('Virhe tuotteen hakemisessa'));

    const userId = 'user123';
    const tuoteId = 'product789';
    const quantity = await getTuoteMaaraFromCart(userId, tuoteId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/v1/ostoskori/${userId}/${tuoteId}`, {
      method: 'GET',
    });
    expect(quantity).toEqual(0);
  });

  describe('Language selection redirection', () => {
    beforeEach(() => {
      // Setup the DOM
      document.body.innerHTML = `
        <select id="kieli">
          <option value="FI">Suomi</option>
          <option value="EN">English</option>
          <option value="CN">中文</option>
          <option value="ET">Eesti</option>
          <option value="SV">Svenska</option>
        </select>
      `;

      // Mock the redirection by spying on window.location.href
      delete window.location;
      window.location = { href: '' };

      // Assuming your function to attach event listeners is called `setupLanguageSelection`
      setupLanguageSelection();  // This function needs to be implemented by you
    });

    test('redirects to the Finnish page when "FI" is selected', () => {
      const select = document.getElementById('kieli');
      select.value = 'FI';
      select.dispatchEvent(new Event('change'));

      expect(window.location.href).toBe('1Etusivu.html');  // Adjust URL based on your routing logic
    });

    test('redirects to the English page when "EN" is selected', () => {
      const select = document.getElementById('kieli');
      select.value = 'EN';
      select.dispatchEvent(new Event('change'));

      expect(window.location.href).toBe('1Etusivu_en.html');  // Adjust URL based on your routing logic
    });

    // Add additional tests for other languages
  });
  describe('Language selection redirection', () => {
    beforeEach(() => {
      // Setup the DOM
      document.body.innerHTML = `
        <select id="kieli">
          <option value="FI">Suomi</option>
          <option value="EN">English</option>
          <option value="CN">中文</option>
          <option value="ET">Eesti</option>
          <option value="SV">Svenska</option>
        </select>
      `;

      // Mock the redirection by spying on window.location.href
      delete window.location;
      window.location = { href: '' };

      // Assuming your function to attach event listeners is called `setupLanguageSelection`
      setupLanguageSelection();  // This function needs to be implemented by you
    });

    test('redirects to the Finnish page when "FI" is selected', () => {
      const select = document.getElementById('kieli');
      select.value = 'FI';
      select.dispatchEvent(new Event('change'));

      expect(window.location.href).toBe('1Etusivu.html');  // Adjust URL based on your routing logic
    });

    test('redirects to the English page when "EN" is selected', () => {
      const select = document.getElementById('kieli');
      select.value = 'EN';
      select.dispatchEvent(new Event('change'));

      expect(window.location.href).toBe('1Etusivu_en.html');  // Adjust URL based on your routing logic
    });

    // Add additional tests for other languages
  });


