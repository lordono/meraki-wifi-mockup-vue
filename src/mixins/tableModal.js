import BaseModal from "@/components/Base/BaseModal";
import TableView from "@/components/TableView/TableView";

export default {
  components: {
    BaseModal,
    TableView
  },
  data() {
    return {
      modal: false,
      modalTime: "day",
      modalTitle: "",
      modalDistrict: ""
    };
  },
  computed: {
    modalData: function() {
      if (this.modalDistrict) {
        return this.data.filter(i => i.district === this.modalDistrict);
      } else return this.data;
    }
  },
  methods: {
    showModal: function(event, time) {
      this.modalTime = time;
      this.modalDistrict = event;
      this.modalTitle = `Details in ${event}`;
      this.modal = true;
    }
  }
};
