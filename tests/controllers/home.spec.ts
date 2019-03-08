const home = require("../../api/controllers/home");

describe("/api", () => {
    describe("get", () => {
        let reqMock = jasmine.createSpyObj("Request", ["body"]);
        let resMock = jasmine.createSpyObj("Response", ["status", "end"]);

        beforeEach(() => {
            resMock.status.and.callFake(() => {
                return resMock;
            });
        });

        it("returns 200 OK response", () => {
            // act
            home.getAPI(reqMock, resMock);

            // assert
            expect(resMock.status).toHaveBeenCalledWith(200);
        });
    });
});