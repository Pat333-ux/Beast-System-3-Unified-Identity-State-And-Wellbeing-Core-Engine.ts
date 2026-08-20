/**
 * Beast System 3.0 — Unified Governance Core Engine
 * Integrates stability, trauma, trust, wellbeing, constitution, municipal/global sync, LUCR.
 */

export class UnifiedGovernanceCoreEngine {
    constructor() {
        this.state = {
            stability: 0,
            trauma: 0,
            trust: 0,
            wellbeing: 0,
            constitutional: "aligned",
            municipal: 0,
            global: 0,
            lucr: 0
        };
    }

    loadSignals(input) {
        this.state.trauma = input.trauma;
        this.state.trust = input.trust;
        this.state.wellbeing = input.wellbeing;
    }

    computeStability() {
        const { wellbeing, trauma, trust } = this.state;

        this.state.stability =
            (wellbeing * 1.4) -
            (trauma * 2.1) -
            (trust * 0.9);

        return this.state.stability;
    }

    enforceConstitution(rules) {
        const status = rules.check();
        this.state.constitutional = status;

        if (status !== "aligned") {
            rules.correct();
        }
    }

    syncMunicipalGlobal(muni) {
        this.state.municipal = muni.municipal();
        this.state.global = muni.global();
    }

    propagateInfluence(civic) {
        civic.apply(this.state.stability);
    }

    updateEconomics(lucr) {
        this.state.lucr = lucr.update({
            stability: this.state.stability,
            trauma: this.state.trauma,
            constitutional: this.state.constitutional
        });
    }

    tick(input, rules, muni, civic, lucr) {
        this.loadSignals(input);
        this.computeStability();
        this.enforceConstitution(rules);
        this.syncMunicipalGlobal(muni);
        this.propagateInfluence(civic);
        this.updateEconomics(lucr);

        return this.state;
    }
}
