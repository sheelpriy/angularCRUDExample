'use strict';

/* Services */

angular.module('contactPath.services', []).
    value('version', '0.1').
    value('localStorage', window.localStorage).
    service('contacts', function (localStorage, $rootScope) {
        var self = this;

        self.save = function (contact) {
            if (!contact.hasOwnProperty('id')) {
                var highest = 1;
                for (var i = 0; i < self.contacts.length; i++) {
                    if (self.contacts[i].id > highest) highest = self.contacts[i].id;
                }
                contact.id = ++highest;
            }
            self.contacts.push(contact);

            self.contacts.sort(function (a, b) {
                if (a.name && b.name) {
                    var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
                    return alc > blc ? 1 : alc < blc ? -1 : 0;
                }
            });
            return contact.id;
        };
        self.update = function (contact) {
            for (var i = 0; i < self.contacts.length; i++) {
                if (self.contacts[i].id == contact.id) {
                    if (contact.name) {
                        self.contacts[i].name = contact.name;
                    }
                    if (contact.phone) {
                        self.contacts[i].phone = contact.phone;
                    }
                    if (contact.email) {
                        self.contacts[i].email = contact.email;
                    }

                }
                ;
            }
            return contact.id;
        }
        self.get = function (id) {
            for (var i = 0; i < self.contacts.length; i++) {
                if (self.contacts[i].id == id)
                    return self.contacts[i];
            }
        };

        self.remove = function (id) {
            for (var i = 0; i < self.contacts.length; i++) {
                if (self.contacts[i].id == id) {
                    self.contacts.splice(i, 1);
                }
            }
        }

        self.genContactLists = function () {
            var current;
            var i = -1;
            var contactLists = [];
            self.contacts.forEach(function (contact) {
                if (contact.name) {
                    if (contact.name.charAt(0).toUpperCase() !== current) {
                        current = contact.name.charAt(0).toUpperCase();
                        i++;
                        contactLists[i] = {};
                        contactLists[i].name = current
                        contactLists[i].contacts = [];
                    }
                    contactLists[i].contacts.push(contact);
                }
            });

            return contactLists;
        }
        self.flush = function () {
            self.contacts = [];
        }

        createPersistentProperty('contacts', 'cpContactLists', Array);
//        self.flush();
        if (self.contacts.length === 0) {
            self.save({id:1, name:"Adhil Azeez NV", phone:"1234567890", email:"adhil@liberlabs.com"});
        }
        self.contactLists = self.genContactLists();
        function createPersistentProperty(localName, storageName, Type) {
            var json = localStorage[storageName];

            self[localName] = json ? JSON.parse(json) : new Type;

            $rootScope.$watch(
                function () {
                    return self[localName];
                },
                function (value) {
                    if (value) {
                        localStorage[storageName] = JSON.stringify(value);
                        self.contactLists = self.genContactLists();
                    }
                },
                true);

        }
    });

