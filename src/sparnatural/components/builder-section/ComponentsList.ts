import ISparnaturalSpecification from "../../spec-providers/ISparnaturalSpecification";
import HTMLComponent from "../HtmlComponent";
import GroupWrapper from "./groupwrapper/GroupWrapper";

/*
    Componentslist does correspond to the <ul class="componentsListe"> OR <ul class="childsList">
    Depending on the ParentComponent. If BGWrapper is parent, then it is the root Componentslist
    Componentslist holds a list of GroupWrapper siblings added with 'addAndComponent'.
*/
class ComponentsList extends HTMLComponent {
  specProvider: ISparnaturalSpecification;
  rootGroupWrapper: GroupWrapper;
  constructor(ParentComponent: HTMLComponent, specProvider: ISparnaturalSpecification) {
    super("componentsListe", ParentComponent, null);
    this.specProvider = specProvider;
  }

  render(): this {
    super.render();
    this.initFirstGroupWrapper();
    return this;
  }

  initFirstGroupWrapper() {
    this.rootGroupWrapper = new GroupWrapper(
      this,
      this.specProvider,
      // depth = 0
      0,
      undefined,
      // render eye button on the root StartClassGroup
      true
    ).render();
    // The first criteriaGrp always has the "eye" icon to select it as a variable in the result set
    this.rootGroupWrapper.CriteriaGroup.StartClassGroup.inputSelector.selectViewVariableBtn.render()
  }

  attachNewRoot(grpWrapper: GroupWrapper) {
    this.rootGroupWrapper = grpWrapper;
    // this should already be the case, but we are just making sure it is
    this.rootGroupWrapper.ParentComponent = this;
    this.rootGroupWrapper.CriteriaGroup.StartClassGroup.inputSelector.selectViewVariableBtn.render()
  }
}

export default ComponentsList;
