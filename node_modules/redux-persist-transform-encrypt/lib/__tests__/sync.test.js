"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sync_1 = require("../sync");
describe('sync', function () {
    describe('configuration', function () {
        it('throws an error when not given any configuration', function () {
            expect(function () {
                return (0, sync_1.encryptTransform)(void 0);
            }).toThrowErrorMatchingInlineSnapshot("\"redux-persist-transform-encrypt: No configuration provided.\"");
        });
        it('throws an error when not given a secret key', function () {
            expect(function () {
                return (0, sync_1.encryptTransform)({
                    secretKey: void 0,
                });
            }).toThrowErrorMatchingInlineSnapshot("\"redux-persist-transform-encrypt: No secret key provided.\"");
        });
    });
    describe('inbound', function () {
        it('encrypts the inbound state', function () {
            var transform = (0, sync_1.encryptTransform)({
                secretKey: 'redux-is-awesome',
            });
            var key = 'testState';
            var state = {
                foo: 'bar',
            };
            var newState = transform.in(state, key, state);
            expect(typeof newState).toBe('string');
            expect(newState).not.toEqual(state);
        });
    });
    describe('outbound', function () {
        it('decrypts the outbound state', function () {
            var transform = (0, sync_1.encryptTransform)({
                secretKey: 'redux-is-awesome',
            });
            var key = 'testState';
            var state = {
                foo: 'bar',
            };
            var encryptedState = transform.in(state, key, state);
            var decryptedState = transform.out(encryptedState, key, encryptedState);
            expect(decryptedState).toEqual(state);
        });
        it('calls the error handler when the decryption fails', function () {
            var inboundTransform = (0, sync_1.encryptTransform)({
                secretKey: 'redux-is-awesome',
            });
            var key = 'testState';
            var state = {
                foo: 'bar',
            };
            var encryptedState = inboundTransform.in(state, key, state);
            var handleError = jest.fn();
            var transform = (0, sync_1.encryptTransform)({
                secretKey: 'different-secret',
                onError: handleError,
            });
            transform.out(encryptedState, key, encryptedState);
            expect(handleError).toHaveBeenCalledWith(new Error('redux-persist-transform-encrypt: Could not decrypt state. Please verify that you are using the correct secret key.'));
        });
    });
    describe('round trip', function () {
        it('works when the inbound state is already a JSON string', function () {
            var transform = (0, sync_1.encryptTransform)({
                secretKey: 'redux-is-awesome',
            });
            var key = 'testState';
            var state = JSON.stringify({
                foo: 'bar',
            });
            var encryptedState = transform.in(state, key, state);
            var decryptedState = transform.out(encryptedState, key, encryptedState);
            expect(decryptedState).toStrictEqual(state);
        });
        it('works when the inbound state is a plain string', function () {
            var transform = (0, sync_1.encryptTransform)({
                secretKey: 'redux-is-awesome',
            });
            var key = 'testState';
            var state = 'Hello World';
            var encryptedState = transform.in(state, key, state);
            var decryptedState = transform.out(encryptedState, key, encryptedState);
            expect(decryptedState).toStrictEqual(state);
        });
    });
});
