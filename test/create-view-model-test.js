'use strict';
import {observableViewModel} from '../src';
import expect from 'expect';
import {mobx} from "brain-store/lib/index";


/* mobx.configure({ enforceActions: "observed" }) */
mobx.useStrict(true);

class TodoClass {
    @mobx.observable title;
    @mobx.observable done;
    @mobx.observable usersInterested;
    @mobx.computed
    get usersCount() {
        return this.usersInterested.length
    }
}
function Todo(title, done, usersInterested) {
    mobx.extendObservable(this, {
        title: title,
        done: done,
        usersInterested: usersInterested,
        get usersCount() {
            return this.usersInterested.length
        }
    })
}
/* describe('create view model', t => {
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
}); */
function tests(model) {
    const viewModel = observableViewModel(model);
    let tr
    let vr
    // original rendering
    const d1 = mobx.autorun(() => {
        tr =
            model.title +
            ":" +
            model.done +
            ",interested:" +
            model.usersInterested.slice().toString() +
            ",usersCount:" +
            model.usersCount
    })
    // view model rendering
    const d2 = mobx.autorun(() => {
        vr =
            viewModel.title +
            ":" +
            viewModel.done +
            ",interested:" +
            viewModel.usersInterested.slice().toString() +
            ",usersCount:" +
            viewModel.usersCount
    })
    expect(tr).toEqual("coffee:false,interested:Vader,Madonna,usersCount:2")
    expect(vr).toEqual("coffee:false,interested:Vader,Madonna,usersCount:2")

    // === 修改模型，则依据模型创建的数据跟着变化 ===
    mobx.runInAction(() => (model.title = "tea")) 
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,usersCount:2")
    expect(vr).toEqual("tea:false,interested:Vader,Madonna,usersCount:2") // change reflected in view model
    expect(viewModel.isDirty).toEqual(false)


    mobx.runInAction(() => model.usersInterested.push("Tarzan"))
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,usersCount:3")
    expect(vr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,usersCount:3") // change reflected in view model
    expect(viewModel.isDirty).toEqual(false)


    mobx.runInAction(() => (viewModel.done = true)) //
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,usersCount:3")  // model
    expect(vr).toEqual("tea:true,interested:Vader,Madonna,Tarzan,usersCount:3") // view
    expect(viewModel.isDirty).toEqual(true)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(true)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(false)
    expect(viewModel.isPropertyDirty("usersCount")).toEqual(false)


    const newUsers = ["Putin", "Madonna", "Tarzan"]
    mobx.runInAction(() => (viewModel.usersInterested = newUsers))
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,usersCount:3")
    expect(vr).toEqual("tea:true,interested:Putin,Madonna,Tarzan,usersCount:3")
    expect(viewModel.isDirty).toEqual(true)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(true)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(true)
    expect(viewModel.isPropertyDirty("usersCount")).toEqual(false)


    mobx.runInAction(() => (viewModel.done = false))
    expect(viewModel.isPropertyDirty("done")).toEqual(true)

    mobx.runInAction(() => model.usersInterested.push("Cersei"))
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(vr).toEqual("tea:false,interested:Putin,Madonna,Tarzan,usersCount:3") // change NOT reflected in view model bcs users are dirty
    expect(viewModel.isDirty).toEqual(true)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(true)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(true)

    // should reset
    viewModel.reset()
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(vr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(viewModel.isDirty).toEqual(false)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(false)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(false)

    mobx.runInAction(() => (viewModel.title = "beer"))
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(vr).toEqual("beer:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(viewModel.isDirty).toEqual(true)
    expect(viewModel.isPropertyDirty("title")).toEqual(true)
    expect(viewModel.isPropertyDirty("done")).toEqual(false)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(false)


    mobx.runInAction(() => viewModel.resetProperty("title"))
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(vr).toEqual("tea:false,interested:Vader,Madonna,Tarzan,Cersei,usersCount:4")
    expect(viewModel.isDirty).toEqual(false)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(false)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(false)


    mobx.runInAction(() => {
        model.usersInterested.pop()
        model.usersInterested.pop()
    })
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,usersCount:2")
    expect(vr).toEqual("tea:false,interested:Vader,Madonna,usersCount:2")
    expect(viewModel.isDirty).toEqual(false)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(false)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(false)

    mobx.runInAction(() => {
        viewModel.title = "cola"
        viewModel.usersInterested = newUsers
    })
    expect(tr).toEqual("tea:false,interested:Vader,Madonna,usersCount:2")
    expect(vr).toEqual("cola:false,interested:Putin,Madonna,Tarzan,usersCount:3")
    expect(viewModel.isDirty).toEqual(true)
    expect(viewModel.isPropertyDirty("done")).toEqual(false)
    expect(viewModel.isPropertyDirty("title")).toEqual(true)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(true)

     // model changes should not update view model which is dirty  基本数据类型时，模型变化，数据视图不应该受影响，引用类型除外 如数组，对象
     mobx.runInAction(() => (model.title = "coffee"))
     expect(tr).toEqual("coffee:false,interested:Vader,Madonna,usersCount:2")
     expect(vr).toEqual("cola:false,interested:Putin,Madonna,Tarzan,usersCount:3")

     viewModel.submit() // 把数据同步到模型
    expect(tr).toEqual("cola:false,interested:Putin,Madonna,Tarzan,usersCount:3")
    expect(vr).toEqual("cola:false,interested:Putin,Madonna,Tarzan,usersCount:3")
    expect(viewModel.isDirty).toEqual(false)
    expect(viewModel.isPropertyDirty("done")).toEqual(false)
    expect(viewModel.isPropertyDirty("title")).toEqual(false)
    expect(viewModel.isPropertyDirty("usersInterested")).toEqual(false)
    d1()
    d2()
}
describe('create view model-new', t => {
    it('test NON Class/decorator createViewModel behaviour', () => {
        const model = new Todo("coffee", false, ["Vader", "Madonna"]);
    
        tests(model);

     /*    const model1 = new TodoClass();
    model1.title = "coffee";
    model1.done = false;
    model1.usersInterested = ["Vader", "Madonna"];    

    tests(model1); */
    });
});
