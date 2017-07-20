'use strict';
import {observableViewModel} from '../src';
import expect from 'expect';
import {mobx} from "brain-store/lib/index";

describe('create view model', t => {
    const vm = observableViewModel({title: 'title'})

    const container = mobx.computed(() => {
        const {title} = vm;
        return {title};
    });
    let actual = container.get();
    var disposer = mobx.autorun(
        () => {
            actual = container.get();
        });

    it('observable', () => {
        mobx.runInAction(() => vm.title = 'new');
        expect(vm.title).toEqual(actual.title);
    });

    it('isDirty', () => {
        mobx.runInAction(() => vm.title = 'new');
        expect(vm.isDirty).toEqual(true);
    });

    it('rest', () => {
        console.log(vm.title);
        vm.reset();
        console.log('===');
        console.log(vm.title);
        expect(vm.isDirty).toEqual(false);
    });

    it('isPropertyDirty', () => {
        mobx.runInAction(() => vm.title = 'new');
        expect(vm.isPropertyDirty('title')).toEqual(true);
    });

    it('submit', () => {
        vm.submit();
        expect(vm.isDirty).toEqual(false);

        expect(vm.model.title).toEqual(vm.title);
    });
});
