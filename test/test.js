const iUseArchBtwERC20TokenDeployed = artifacts.require('iUseArchBtwERC20Token');

contract('iUseArchBtwERC20Token', async () => {

    let iUseArchBtwERC20Token = null;

    before(async () => {
        iUseArchBtwERC20Token = await iUseArchBtwERC20TokenDeployed.new(1000);
    });

    let accounts = ['0x544c754e125c4a34e304884d15016b4a26e7a2b4', "0x2d44dd818bb65ecbee54fb1d2e606967927bebaa", "0x2f8077b55a325173710f9a8392e6cdae60c1d80d"]

    it('Sould be an ERC20 implementation', async () => {

        assert.isFunction(iUseArchBtwERC20Token.totalSupply);
        assert.isFunction(iUseArchBtwERC20Token.balanceOf);
        assert.isFunction(iUseArchBtwERC20Token.transfer);
        assert.isFunction(iUseArchBtwERC20Token.allowance);
        assert.isFunction(iUseArchBtwERC20Token.approve);
        assert.isFunction(iUseArchBtwERC20Token.transferFrom);

    });

    it('Check "totalSupply"', async () => {

        const totalSupply = await iUseArchBtwERC20Token.totalSupply();

        assert(String(totalSupply) === '1000000000000000000000');

    });

    it('Check "balanceOf"', async () => {

        const balanceOf = await iUseArchBtwERC20Token.balanceOf(accounts[0]);

        assert(String(balanceOf) === '1000000000000000000000');

    });

    it('Check "transfer"', async () => {

        const amountToSend = '500';

        await iUseArchBtwERC20Token.transfer(accounts[1], amountToSend);

        const receiverBalance = await iUseArchBtwERC20Token.balanceOf(accounts[1]);

        assert(String(receiverBalance) == amountToSend);

    });

    it('Check "approve" and "allowance"', async () => {

        const amountToAllow = '500';

        await iUseArchBtwERC20Token.approve(accounts[1], amountToAllow);

        const allownceValue = await iUseArchBtwERC20Token.allowance(accounts[0], accounts[1]);

        assert(String(allownceValue) == amountToAllow);

    });


    it('Check "transferFrom"', async () => {

        const amountToSpend = '500';

        await iUseArchBtwERC20Token.transferFrom(accounts[0], accounts[2], amountToSpend, { from: accounts[1] });

        const receiverBalance = await iUseArchBtwERC20Token.balanceOf(accounts[2]);

        assert(String(receiverBalance) === amountToSpend);

    });


    it('Check variables', async () => {

        let name = await iUseArchBtwERC20Token.name();
        let symbol = await iUseArchBtwERC20Token.symbol();
        let decimals = await iUseArchBtwERC20Token.decimals();
        assert(name === 'I Use Arch Btw Token');
        assert(symbol === 'IUAB');
        assert(decimals.toNumber() === 18);

    });




});